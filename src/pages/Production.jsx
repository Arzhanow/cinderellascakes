import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductionSlider from '../components/ProductionSlider'
import {
  createStagger,
  createTransition,
  fadeInUp,
  glowIn,
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
    title: 'Кетъринг с подпис',
    subtitle: 'Дизайн на десертни станции и live plating.',
    detailHeading: 'Авторски кетъринг за тържества и корпоративни сцени.',
    summary:
      'Поемаме креативния процес от стратегическа консултация и moodboard до изработка на инсталации, live plating и координация на сервизния екип. Въвеждаме ясни стандарти за сервиране и изграждане на опит, така че всяка дегустация да кореспондира с темата на събитието и да отговаря на специални режими – от безглутенови десерти до high-protein сетове.',
    highlight: 'Moodboard, бюджет и дегустация до 5 работни дни след запитване.',
    image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80',
    backdrop: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1600&q=80',
    chips: ['Концептуален борд', 'Екип на място', 'Меню по режими'],
    process: [
      'Получаваме информация за повод, локация и брой гости.',
      'Представяме moodboard, вкусове и оферта с ясно разписани роли.',
      'Организираме дегустация и финализираме график за монтаж/сервиз.',
    ],
    benefits: [
      'Ангажиран координатор за връзка с агенция, сценография и логистика.',
      'Разделени станции за VIP, kids, vegan или функционални режими.',
      'Интерактивни елементи – engraved toppers, персонални послания, take-away boxes.',
    ],
    detailPage: '/catering',
    contact: CONTACT,
  },
  {
    id: 'retail',
    eyebrow: 'За магазини · Daily Stock',
    title: 'Премиум витрина',
    subtitle: 'Стабилен асортимент и сезонни лимитки.',
    detailHeading: 'Дистрибуция за магазини с гарантиран стандарт.',
    summary:
      'Работим като удължение на вашия екип – анализираме оборот, препоръчваме оптимален микс от торти, монодесерти и grab-and-go предложения, подготвяме температурно контролиран транспорт и документи за произход и алергени. Поддържаме комуникация с мениджъра на обекта и актуализираме селекцията според сезон и промоционален календар.',
    highlight: 'Личен акаунт мениджър и дегустационни сетове за персонала всеки сезон.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
    backdrop: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80',
    chips: ['Температурен транспорт', 'QA протоколи', 'Private label'],
    process: [
      'Споделяте целеви оборот, капацитет и нужди по категории.',
      'Курираме дегустационен сет и представяме асортимент с препоръчани количества.',
      'Подписваме график за доставки, витрина и merchandising указания.',
    ],
    benefits: [
      'Brand book за подредба и комуникация + готови POS материали.',
      'Протоколи за приемане, проследимост и обратна връзка за всяка партида.',
      'Опция за съвместен branding и лимитирани collab серии.',
    ],
    detailPage: '/retail',
    contact: CONTACT,
  },
  {
    id: 'hotels',
    eyebrow: 'За хотели · Premium Rooms',
    title: 'Room service десерти',
    subtitle: 'Подпис за VIP гости и welcome amenities.',
    detailHeading: 'Хотелски програми с гурме довършек.',
    summary:
      'Изграждаме сладкарска програма за room service, lounge и special amenities. Създаваме дву- или триелементни сетове с контраст в текстурите, персонализирани монограми и ясни инструкции за сервиране, включително shelf life и препоръки за plating на място.',
    highlight: 'Ключови варианти без глутен/лактоза и експресен буфер при VIP заявки.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    backdrop: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    chips: ['Welcome amenities', 'Room service menus', 'Afternoon tea'],
    process: [
      'Дефинираме опита – повод, тип гости и очакван стил на сервиране.',
      'Изпращаме tasting box с инструкции и ценови параметри.',
      'Настройваме регулярен график + emergency протокол за кратки срокове.',
    ],
    benefits: [
      'Персонализирани картички, QR код към хотелски услуги или монограми върху десерта.',
      'Протокол за работа с room service екипа – сервиране, температура, история.',
      'Галерия от снимки и текстове, готови за включване в комуникационни канали.',
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
  const [selectedService, setSelectedService] = useState(null)

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

        <div className="flex flex-col gap-10">
          <ProductionSlider slides={memoizedServices} onSlideSelect={setSelectedService} />

          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.article
                key={selectedService.id}
                className="rounded-[36px] border border-white/10 bg-white/5 px-6 py-8 text-white/85 shadow-[0_25px_65px_rgba(5,0,18,0.45)] backdrop-blur-xl sm:px-8 sm:py-10 2xl:px-10 2xl:py-12 4xl:px-12 4xl:py-14"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -16 }}
                 transition={detailTransition}
               >
                <p className="text-xs uppercase tracking-[0.55em] text-white/60 2xl:text-sm 4xl:text-base">{selectedService.eyebrow}</p>
                <h2 className="mt-3 font-luxury text-3xl text-white sm:text-4xl 2xl:text-5xl">{selectedService.detailHeading}</h2>
                <p className="mt-4 text-white/80 2xl:text-lg">{selectedService.summary}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-brand-accent/80 2xl:text-base">{selectedService.highlight}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedService.chips.map((chip) => (
                    <span
                      key={`${selectedService.id}-${chip}`}
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
                       {selectedService.process.map((step, index) => (
                         <li key={`${selectedService.id}-process-${step}`}>
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
                       {selectedService.benefits.map((benefit) => (
                         <li key={`${selectedService.id}-benefit-${benefit}`} className="flex items-start gap-3">
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
                     <a className="text-lg font-semibold text-white transition hover:text-brand-accent" href={`mailto:${selectedService.contact.email}`}>
                       {selectedService.contact.email}
                     </a>
                   </div>
                   <div>
                     <p className="text-xs uppercase tracking-[0.45em] text-white/50">Телефон</p>
                     <a className="text-lg font-semibold text-white transition hover:text-brand-accent" href={`tel:${selectedService.contact.phone.replace(/\s+/g, '')}`}>
                       {selectedService.contact.phone}
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
                     to={selectedService.detailPage}
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
      </section>
    </main>
  )
}

export default ProductionPage
