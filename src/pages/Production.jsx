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
    id: 'hotels',
    eyebrow: 'HoReCa · Хотели и ресторанти',
    title: 'HoReCa програми',
    subtitle: 'Услуги за кухни с високо натоварване.',
    detailHeading: 'HoReCa – хотели и ресторанти с постоянен стандарт.',
    summary:
      'Производството за HoReCa е организирано така, че да поддържа стабилност и предвидимост при високи дневни натоварвания. Екипът ни включва майстор-сладкари с дългогодишен опит в професионалните кухни, което гарантира десерти, които се държат отлично при сервиз и запазват качеството си през целия ден. Опаковките са съобразени с динамиката в бек офиса – устойчиви, бързи за боравене и оптимизирани за транспорт. Част от портфолиото е проектирано и за работа със замразяване, за да улесни контролa върху наличности и планиране на обеми. Логистичната ни мрежа покрива основните направления и гарантира точни и сигурни доставки до обекти в цялата страна.',
    highlight: 'Опаковки, съобразени с бек офис процеси и национална логистика.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    backdrop: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    chips: ['Екип HoReCa шеф-патисие', 'Опаковки за замразяване', 'Национална логистика'],
    process: [
      'Дефинираме натоварване, меню и изисквания за сервиз.',
      'Настройваме портфолио с възможност за замразяване и бърз сервиз.',
      'Планираме регулярни доставки и буфер за обекти в цялата страна.',
    ],
    benefits: [
      'Продукти, проектирани за стабилен вид и текстура по време на сервиз.',
      'Опаковки, оптимизирани за бек офис динамика и транспорт.',
      'Възможност за контрол на наличности чрез замразени партиди.',
    ],
    contact: CONTACT,
  },
  {
    id: 'retail',
    eyebrow: 'Ритейл · Магазинна мрежа',
    title: 'Ритейл програми',
    subtitle: 'Чиста храна в иновативна опаковка.',
    detailHeading: 'Ритейл – стандартизация и устойчиви опаковки.',
    summary:
      'Ритейл линията е фокусирана върху стандартизация, постоянство на партидите и дългосрочна оптимизация на оборота. Работим по програмата „Чиста храна в иновативна опаковка“, в която използваме рециклирани материали и решения за намаляване на пластмасовия отпадък. Опаковките са херметични и съобразени с динамиката на витрините – устойчиви, практични и удобни за подреждане. Контролът на качеството се ръководи от екип със сериозен практически опит и регулярни специализации в международни центрове по сладкарство, което гарантира еднакво високо ниво на всеки продукт. Разполагаме със собствена логистика за предвидими доставки към магазини и вериги и можем да разработим изделия, адаптирани към специфичен рафт или формат.',
    highlight: 'Програма „Чиста храна“ с рециклируеми опаковки и QA екип.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
    backdrop: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=80',
    chips: ['Рециклируеми материали', 'QA екип със специализации', 'Собствена логистика'],
    process: [
      'Анализираме оборот и витрината, за да предложим оптимален асортимент.',
      'Проектираме опаковки и рецепти според рафта и категорията.',
      'Настройваме график за доставки и обратна връзка за партидите.',
    ],
    benefits: [
      'Херметични опаковки, удобни за подреждане и комуникация на рафт.',
      'Екип за контрол на качеството с международни специализации.',
      'Възможност за разработки, адаптирани към конкретен формат или верига.',
    ],
    contact: CONTACT,
  },
  {
    id: 'catering',
    eyebrow: 'Кетъринг · Събития и корпоративни клиенти',
    title: 'Кетъринг с финес',
    subtitle: 'Детайлна визия и авторски мини порции.',
    detailHeading: 'Кетъринг – сценография и безупречна презентация.',
    summary:
      'Производството за кетъринг е насочено към детайлната визия и безупречната презентация. Внедряваме методики от международни обучения, като акцентът е върху ръчен финиш и прецизност при мини и индивидуални порции. Форматите са оптимизирани за лесно сервиране, разпределение и силен визуален ефект при големи събития. Опаковките защитават подредбата и естетиката по време на транспорт, включително при сложна логистика на терен. Благодарение на собствената ни мрежа за доставки можем да изпълняваме заявки със кратки срокове и да произвеждаме серии, адаптирани към концепцията на конкретно събитие или клиент.',
    highlight: 'Ръчен финиш, защитени опаковки и бърза доставка за събития.',
    image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=80',
    backdrop: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1600&q=80',
    chips: ['Ръчен финиш', 'Опаковки за сцена', 'Бърза доставка'],
    process: [
      'Получаваме концепция, бриф и очакван брой гости.',
      'Разработваме сетове и мини порции с точни инструкции за сервиз.',
      'Организираме транспорт и onsite подкрепа, когато е необходимо.',
    ],
    benefits: [
      'Методики от международни обучения за безупречна визия.',
      'Опаковки, които запазват подредбата дори при сложна логистика.',
      'Възможност за адаптация към конкретна тема или корпоративна идентичност.',
    ],
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
            HoReCa · професионални услуги
          </motion.p>
          <motion.h1
            className="mt-4 font-luxury text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl 4xl:text-[5.5rem]"
            variants={glowIn}
            transition={createTransition(0.1, 0.8)}
          >
            HoReCa решения за хотели, ресторанти и събития.
          </motion.h1>
          <motion.p
            className="mt-6 text-base text-white/85 sm:text-lg 2xl:text-xl 4xl:text-2xl"
            variants={fadeInUp}
            transition={createTransition(0.2, 0.7)}
          >
            Изградихме три специализирани линии – HoReCa, Retail и Catering – които осигуряват стабилност в кухнята,
            стандартизация във витрината и сценография при събития. Във всяка програма включваме консултация,
            протоколи за работа, контакт с екипа ни и директна връзка с формата за запитване.
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
