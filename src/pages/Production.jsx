 import { useMemo, useState } from 'react'
 import { AnimatePresence, motion } from 'framer-motion'
 import { Link } from 'react-router-dom'
 import ProductionSlider from '../components/ProductionSlider'
 import {
   createStagger,
   createTransition,
   fadeInUp,
   glowIn,
   popIn,
   revealConfig,
   slideIn,
 } from '../utils/motionPresets'

 const CONTACT = {
   email: 'hello@cinderellascakes.bg',
   phone: '+359 88 412 34 56',
 }

 const productionServices = [
   {
     id: 'catering',
     eyebrow: 'Събития · 30-300 гости',
     title: 'Кетъринг спектакъл',
     subtitle: 'Moodboard, live plating и pop-up tasting бар.',
     detailHeading: 'Кетъринг, който разказва история.',
     summary:
       'Създаваме десертни инсталации за събития, в които всеки слой е куриран според темата. Комбинираме шоу елемент (live plating, дегустационна станция) с меню за специални режими и безкомпромисна визия.',
     highlight: 'Moodboard и дегустация до 5 работни дни след запитването.',
     image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80',
     backdrop: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1600&q=80',
     chips: ['3D визуализации', 'Екип на място', 'Меню без захар / с протеин'],
     process: [
       'Изпратете тема, дата и брой гости.',
       'Получавате moodboard, вкусове и бюджет за одобрение.',
       'Назначаваме дегустация или изпращаме мостри.',
     ],
     benefits: [
       'Екип за сервиз и декор, който работи под нашия стандарт.',
       'Сегментирано меню (kids, vegan, high-protein) в рамките на една станция.',
       'Опция за персонализирани подаръци или take-away кутийки.',
     ],
     detailPage: '/catering',
     contact: CONTACT,
   },
   {
     id: 'retail',
     eyebrow: 'За магазини · daily stock',
     title: 'Витрина с подпис',
     subtitle: 'Стабилно производство + сезонни серии.',
     detailHeading: 'Ритейл партньорство с повторяем вкус.',
     summary:
       'Подготвяме селекция от торти, монодесерти и мини сладкиши, които издържат във витрина и пристигат с инструкции за сервиране. Следим продажбите и адаптираме сезонно без компромис в визуалния стандарт.',
     highlight: 'Достъп до лимитирани серии и дегустации за екипа ви всеки сезон.',
     image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
     backdrop: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80',
     chips: ['Температурно контролиран транспорт', 'Документация и алергени', 'Private label'],
     process: [
       'Споделяте оборот и предпочитани формати.',
       'Получавате дегустационен сет и предложен асортимент.',
       'Синхронизираме график за доставки и поддръжка.',
     ],
     benefits: [
       'Brand book за начин на подреждане и сервиране.',
       'Документи за произход и списък с алергени за всяка партида.',
       'Възможност за съвместен бранд и опаковки.',
     ],
     detailPage: '/retail',
     contact: CONTACT,
   },
   {
     id: 'hotels',
     eyebrow: 'За хотели · premium rooms',
     title: 'Room service десерти',
     subtitle: 'Signature сетове за VIP гости.',
     detailHeading: 'Хотелски услуги с впечатляващ финал.',
     summary:
       'Изграждаме сладки сетове за room service, afternoon tea или welcome amenities. Комбинираме лек десерт за индивидуално сервиране с по-щедър акцент и добавяме инструкции за екипа ви.',
     highlight: 'Възможност за персонализиран печат и послание към гостите.',
     image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
     backdrop: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
     chips: ['Welcome amenities', 'Room service set menus', 'Afternoon tea'],
     process: [
       'Споделяте стандартите на марката и капацитета.',
       'Получавате tasting box и инструкции за сервиране.',
       'Подготвяме постоянен график + emergency буфер.',
     ],
     benefits: [
       'Персонализирани послания, монограми или QR кодове към услуга на хотела.',
       'Вариации без глутен/лактоза за VIP гости при заявка до 24 ч.',
       'Набор от снимки и copy за вашите комуникации.',
     ],
     detailPage: '/hotels',
     contact: CONTACT,
   },
 ]

 const detailTransition = {
   duration: 0.45,
   ease: [0.3, 0, 0.2, 1],
 }

 const ProductionPage = () => {
  const memoizedServices = useMemo(() => productionServices, [])
  const [activeService, setActiveService] = useState(memoizedServices[0])

  const handleSlideChange = (service) => {
    setActiveService(service)
  }

   return (
     <main className="relative min-h-screen overflow-hidden bg-brand-night text-white">
       <div
         aria-hidden="true"
         className="pointer-events-none absolute inset-0"
       >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,176,247,0.18),transparent_60%)] blur-3xl"></div>
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_bottom,_rgba(139,233,253,0.18),transparent_60%)] blur-3xl"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-brand-night/40 via-brand-dusk/10 to-brand-night"></div>
       </div>

       <section className="layout-shell relative space-y-12 pb-24 pt-24 2xl:space-y-16 3xl:space-y-20 3xl:pb-32 3xl:pt-28 4xl:space-y-24 4xl:pb-36 4xl:pt-36">
         <motion.header
           className="max-w-3xl text-white"
           variants={createStagger(0.08)}
           {...revealConfig}
         >
           <motion.p
             className="text-xs uppercase tracking-[0.55em] text-white/60 2xl:text-sm 4xl:text-base"
             variants={slideIn('down', 40)}
             transition={createTransition(0, 0.65)}
           >
             Производство · услуги
           </motion.p>
           <motion.h1
             className="mt-4 font-luxury text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl 4xl:text-[5.5rem]"
             variants={glowIn}
             transition={createTransition(0.1, 0.8)}
           >
             Три начина да сервираме подписа ви.
           </motion.h1>
           <motion.p
             className="mt-6 text-base text-white/85 sm:text-lg 2xl:text-xl 4xl:text-2xl"
             variants={fadeInUp}
             transition={createTransition(0.2, 0.7)}
           >
             Изберете формат – събитие, магазин или хотел – и вижте как изглежда процесът. Във всеки
             сценарий включваме консултация, инструкции, контакт към нашия екип и директна връзка с формата за запитване.
           </motion.p>
         </motion.header>

         <div className="grid gap-10 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)]">
           <ProductionSlider slides={memoizedServices} onSlideChange={handleSlideChange} />

           <AnimatePresence mode="wait">
             {activeService && (
               <motion.article
                 key={activeService.id}
                 className="rounded-[36px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 shadow-[0_25px_65px_rgba(5,0,18,0.45)] backdrop-blur-xl sm:px-8 sm:py-10 2xl:px-10 2xl:py-12 4xl:px-12 4xl:py-14"
                 initial={{ opacity: 0, y: 24 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -16 }}
                 transition={detailTransition}
               >
                 <p className="text-xs uppercase tracking-[0.55em] text-white/60 2xl:text-sm 4xl:text-base">{activeService.eyebrow}</p>
                 <h2 className="mt-3 font-luxury text-3xl text-white sm:text-4xl 2xl:text-5xl">{activeService.detailHeading}</h2>
                 <p className="mt-4 text-white/80 2xl:text-lg">{activeService.summary}</p>
                 <p className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-brand-accent/80 2xl:text-base">{activeService.highlight}</p>

                 <div className="mt-6 flex flex-wrap gap-3">
                   {activeService.chips.map((chip) => (
                     <span
                       key={`${activeService.id}-${chip}`}
                       className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
                     >
                       {chip}
                     </span>
                   ))}
                 </div>

                 <div className="mt-8 grid gap-6">
                   <div>
                     <p className="text-xs uppercase tracking-[0.4em] text-white/50">Как да заявите</p>
                     <ol className="mt-3 space-y-2 text-sm text-white/80 2xl:text-base">
                       {activeService.process.map((step, index) => (
                         <li key={`${activeService.id}-process-${step}`}>
                           <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/70">
                             {index + 1}
                           </span>
                           {step}
                         </li>
                       ))}
                     </ol>
                   </div>

                   <div>
                     <p className="text-xs uppercase tracking-[0.4em] text-white/50">Какво получавате</p>
                     <ul className="mt-3 space-y-2 text-sm text-white/80 2xl:text-base">
                       {activeService.benefits.map((benefit) => (
                         <li key={`${activeService.id}-benefit-${benefit}`} className="flex items-start gap-3">
                           <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-accent"></span>
                           <span>{benefit}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 <div className="mt-8 grid gap-4 rounded-[28px] border border-white/15 bg-black/30 p-5 text-sm text-white/85 shadow-inner backdrop-blur-lg 2xl:p-6 4xl:text-base">
                   <div>
                     <p className="text-xs uppercase tracking-[0.45em] text-white/50">Имейл</p>
                     <a className="text-lg font-semibold text-white transition hover:text-brand-accent" href={`mailto:${activeService.contact.email}`}>
                       {activeService.contact.email}
                     </a>
                   </div>
                   <div>
                     <p className="text-xs uppercase tracking-[0.45em] text-white/50">Телефон</p>
                     <a className="text-lg font-semibold text-white transition hover:text-brand-accent" href={`tel:${activeService.contact.phone.replace(/\s+/g, '')}`}>
                       {activeService.contact.phone}
                     </a>
                   </div>
                   <div>
                     <p className="text-xs uppercase tracking-[0.45em] text-white/50">Контактна форма</p>
                     <Link className="inline-flex items-center gap-1 font-semibold text-brand-cyan transition hover:text-white" to="/#contact">
                       Попълни формата
                       <span aria-hidden="true">→</span>
                     </Link>
                   </div>
                 </div>

                 <div className="mt-6 flex flex-wrap gap-4">
                   <Link
                     className="rounded-full bg-gradient-to-r from-brand-accent via-brand-lilac to-brand-cyan px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-button-contrast shadow-glow-primary transition hover:-translate-y-1 2xl:px-8 2xl:py-4 2xl:text-sm"
                     to={activeService.detailPage}
                   >
                     Към страницата
                   </Link>
                   <Link
                     className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-1 hover:border-white 2xl:px-8 2xl:py-4 2xl:text-sm"
                     to="/#contact"
                   >
                     Изпрати запитване
                   </Link>
                 </div>
               </motion.article>
             )}
           </AnimatePresence>
         </div>

         <motion.section
           className="grid gap-6 rounded-[40px] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-xl sm:grid-cols-3 sm:gap-8 sm:px-10 sm:py-12 3xl:px-16 3xl:py-16"
           variants={createStagger(0.08)}
           {...revealConfig}
         >
           {memoizedServices.map((service) => (
             <motion.div
               key={`summary-${service.id}`}
               className="flex flex-col gap-3 border border-white/10 bg-black/20 px-4 py-5 text-white/80 shadow-[0_15px_35px_rgba(5,0,20,0.35)] backdrop-blur-lg 2xl:px-6 2xl:py-7"
               variants={popIn}
               transition={createTransition(0, 0.5)}
             >
               <p className="text-xs uppercase tracking-[0.45em] text-white/50">{service.eyebrow}</p>
               <p className="text-lg font-semibold text-white">{service.title}</p>
               <p className="text-sm">{service.subtitle}</p>
               <Link className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan transition hover:text-white" to={service.detailPage}>
                 Към услугата
                 <span aria-hidden="true">→</span>
               </Link>
             </motion.div>
           ))}
         </motion.section>
       </section>
     </main>
   )
 }

 export default ProductionPage
