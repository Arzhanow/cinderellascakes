#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { NodeIO } from '@gltf-transform/core'
import { KHRDracoMeshCompression } from '@gltf-transform/extensions'
import draco3d from 'draco3dgltf'

const decoderModule = await draco3d.createDecoderModule()

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.decoder': decoderModule,
  })

const files = process.argv.slice(2)

if (!files.length) {
  console.error('Usage: node scripts/measure-dessert-orientation.mjs <model.glb> [more.glb]')
  process.exit(1)
}

function formatDegrees(value) {
  const normalized = ((value % 360) + 360) % 360
  return Number(normalized.toFixed(2))
}

async function measureOrientation(filePath) {
  const doc = await io.read(filePath)
  const positions = []
  for (const node of doc.getRoot().listNodes()) {
    const mesh = node.getMesh()
    if (!mesh) continue
    const worldMatrix = node.getWorldMatrix?.()
    for (const prim of mesh.listPrimitives()) {
      const posAccessor = prim.getAttribute('POSITION')
      if (!posAccessor) continue
      const array = posAccessor.getArray()
      for (let i = 0; i < array.length; i += 3) {
        let x = array[i]
        let y = array[i + 1]
        let z = array[i + 2]
        if (worldMatrix) {
          const nx = worldMatrix[0] * x + worldMatrix[4] * y + worldMatrix[8] * z + worldMatrix[12]
          const nz = worldMatrix[2] * x + worldMatrix[6] * y + worldMatrix[10] * z + worldMatrix[14]
          x = nx
          z = nz
        }
        positions.push([x, z])
      }
    }
  }

  if (!positions.length) {
    throw new Error(`No vertex positions found in ${filePath}`)
  }

  let cx = 0
  let cz = 0
  for (const [x, z] of positions) {
    cx += x
    cz += z
  }
  cx /= positions.length
  cz /= positions.length

  let tipVector = null
  let maxDistance = -Infinity

  for (const [x, z] of positions) {
    const dx = x - cx
    const dz = z - cz
    const dist2 = dx * dx + dz * dz
    if (dist2 > maxDistance) {
      maxDistance = dist2
      tipVector = [dx, dz]
    }
  }

  const rawAngleDegrees = (Math.atan2(tipVector[0], tipVector[1]) * 180) / Math.PI
  const tipAngleDeg = formatDegrees(rawAngleDegrees)
  const modelOrientationDeg = formatDegrees(-tipAngleDeg)

  return {
    file: filePath,
    centroid: { x: Number(cx.toFixed(4)), z: Number(cz.toFixed(4)) },
    tipAngleDeg,
    modelOrientationDeg,
  }
}

for (const file of files) {
  const resolved = path.resolve(process.cwd(), file)
  try {
    const { tipAngleDeg, modelOrientationDeg } = await measureOrientation(resolved)
    console.log(`${file} → tip ${tipAngleDeg}° · use modelOrientationDeg=${modelOrientationDeg}`)
  } catch (error) {
    console.error(`Failed to measure ${file}:`, error.message)
    process.exitCode = 1
  }
}
