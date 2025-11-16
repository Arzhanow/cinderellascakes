import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { createStagger, createTransition, fadeInUp, glowIn } from '../utils/motionPresets'

const featuredProducts = [
  {
    id: 'garash-classic',
    title: 'Торта "Гараш"',
    slug: 'garash',
    imageSrc: '/images/cakes/garash/20250128_145948.jpg',
    imageAlt: 'Торта "Гараш" с лъскав ганаш и златна декорация',
    badge: 'най-харесвани',
    caption: 'Класическата комбинация от белгийски шоколад и мока сироп.',
    cta: 'Виж повече',
  },
  {
    id: 'chococake-flourless',
    title: 'Шоколадова торта без захар и брашно',
    slug: 'chococake',
    imageSrc: '/images/cakes/chococake/20250128_145808.jpg',
    imageAlt: 'Шоколадова торта без захар и брашно с минималистична декорация',
    badge: 'без захар и брашно',
    caption: 'Чиста линия и какаов характер за смели клиенти.',
    cta: 'Открий легендата',
  },
  {
    id: 'garash-midnight',
    title: 'Торта "Гараш" · Midnight Cut',
    slug: 'garash',
    imageSrc: '/images/cakes/garash/20250128_145957.jpg',
    imageAlt: 'Торта "Гараш" в разрез с дълбок шоколадов блясък',
    badge: 'signature',
    caption: 'Драматичен профил за вечерни дегустации и коктейлни менюта.',
    cta: 'Виж повече',
  },
  {
    id: 'garash-concerto',
    title: 'Торта "Гараш" · Concerto Slice',
    slug: 'garash',
    imageSrc: '/images/cakes/garash/20250128_145939.jpg',
    imageAlt: 'Парче торта "Гараш" с огледална глазура',
    badge: 'portfolio highlight',
    caption: 'Точен разрез, който разкрива симетрията на трийсет и двата пласта.',
    cta: 'Виж повече',
  },
  {
    id: 'garash-detail',
    title: 'Торта "Гараш" · Atelier Detail',
    slug: 'garash',
    imageSrc: '/images/cakes/garash/20250128_150005.jpg',
    imageAlt: 'Детайл от текстурата на торта "Гараш" с лешници',
    badge: 'atelier',
    caption: 'Фокус върху лешниковия пралин и ръчното глазиране.',
    cta: 'Виж повече',
  },
  {
    id: 'garash-glow',
    title: 'Торта "Гараш" · Glow Edition',
    slug: 'garash',
    imageSrc: '/images/cakes/garash/20250128_150003.jpg',
    imageAlt: 'Торта "Гараш" с меко осветление и лешникови орнаменти',
    badge: 'limited',
    caption: 'Сцена за дегустации и бутикови събития с подчертана глазура.',
    cta: 'Виж повече',
  },
]

const ProductImage = ({ product }) => (
  <figure className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-[0_30px_60px_rgba(8,7,25,0.45)]">
    <img
      src={product.imageSrc}
      alt={product.imageAlt}
      loading="lazy"
      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
    />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/60 via-transparent to-transparent opacity-70" />
  </figure>
)

const ProductCard = ({ product, index }) => (
  <motion.article
    variants={fadeInUp}
    transition={createTransition(index * 0.03, 0.65)}
    className="group flex h-full w-full max-w-[480px] flex-col gap-6 rounded-[2.25rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_60px_rgba(8,7,25,0.45)] backdrop-blur-2xl sm:p-6 xl:p-7"
  >
    <ProductImage product={product} />
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <p className="text-[0.65rem] uppercase tracking-[0.55em] text-white/50">{product.badge ?? 'най-харесвани'}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">{product.title}</h3>
        {product.caption ? <p className="mt-3 text-sm text-white/70">{product.caption}</p> : null}
      </div>
      <Link
        to={`/products/${product.slug}`}
        className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-4 py-2 text-[0.62rem] uppercase tracking-[0.4em] text-white/80 transition hover:border-white/70 hover:text-white group-hover:border-white/70 group-hover:text-white sm:w-auto"
      >
        {product.cta}
      </Link>
    </div>
  </motion.article>
)

const ProductsPage = () => (
  <main className="relative isolate mx-auto w-full max-w-[1900px] overflow-hidden px-4 py-14 sm:px-8 sm:py-16 lg:px-16 2xl:px-20 3xl:px-28 4xl:px-32 4xl:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,180,221,0.15),transparent_65%)] blur-3xl lg:h-[26rem] lg:w-[26rem]" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(122,209,255,0.12),transparent_70%)] blur-3xl lg:h-[24rem] lg:w-[24rem]" />
      <div className="absolute inset-x-0 bottom-12 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-[180px]" />
    </div>

    <motion.section
      className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-12"
      variants={createStagger(0.12)}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp} transition={createTransition(0.02, 0.65)} className="flex flex-col gap-4 text-center lg:text-left">
        <p className="text-xs uppercase tracking-[0.6em] text-white/60">най-харесвани</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Продукти</h1>
        <p className="max-w-3xl text-balance text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
          Подбрахме шест емблематични десерта, които нашите гости и HoReCa партньори поръчват всеки сезон. За по-добро
          преживяване заменихме тежките 3D сцени с фотографски кадри направо от ателието, така че страницата да зарежда мигновено.
        </p>
      </motion.div>

      <motion.div
        className="grid w-full justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-10"
        variants={glowIn}
        transition={createTransition(0.08, 0.9)}
      >
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </motion.section>

    <motion.section
      className="relative z-10 mx-auto mt-12 w-full max-w-[1100px]"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={createTransition(0.1, 0.7)}
    >
      <div className="flex flex-col gap-6 rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/10 via-brand-dusk/40 to-brand-night/60 p-8 text-center shadow-[0_35px_65px_rgba(5,5,15,0.55)] backdrop-blur-3xl lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">каталог 2025</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Изтегли каталога с цялото портфолио</h2>
          <p className="mt-3 text-balance text-base leading-relaxed text-white/70 lg:max-w-2xl">
            Съдържа технически спецификации, налични формати и информация за логистика. Файлът се обновява при всяко ново издание.
          </p>
        </div>
        <a
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-accent to-brand-cyan px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-button-contrast shadow-glow-cta transition hover:-translate-y-0.5 sm:w-auto"
          href="/pastrycatalog.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Изтегли каталог
        </a>
      </div>
    </motion.section>
  </main>
)

export default ProductsPage
