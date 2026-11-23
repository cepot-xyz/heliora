import CardNav from './components/CardNav'
import ShapeGrid from './components/ShapeGrid'
import logo from '../Assets/logo white 540p.svg'

const items = [
  {
    label: 'About',
    description: 'The people and the story behind the studio.',
    links: [
      { label: 'Company', href: '/company' },
      { label: 'Careers', href: '/careers' }
    ]
  },
  {
    label: 'Projects',
    description: 'Selected work from the last few years.',
    links: [
      { label: 'Featured', href: '/featured' },
      { label: 'Case studies', href: '/case-studies' }
    ]
  },
  {
    label: 'Contact',
    description: 'Say hello, we read everything.',
    links: [
      { label: 'Email', href: 'mailto:hello@example.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' }
    ]
  }
]

export default function App() {
  return (
    <>
      <ShapeGrid
        className="pointer-events-none fixed! inset-0 z-0"
        shape="square"
        cellSize={44}
        lineWidth={1}
        direction="diagonal"
        speed={0.25}
        lineColor="#222222"
        hoverColor="#222222"
        hoverFillColor="#222222"
        fillOpacity={0}
        rainbow={false}
        tiltX={0}
        tiltY={0}
        glow={0}
        twinkle={0}
        fade={0}
        clickCascade={false}
        intro={false}
        opacity={1}
        backgroundColor="#0a0a0a"
        dpr={1}
      />
      <main className="relative z-10 min-h-screen" onContextMenu={event => event.preventDefault()}>
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[3vh] py-[1vh]">
          <CardNav
            logo={
              <span className="flex h-full items-center gap-2">
                <img src={logo} alt="" className="h-full w-auto shrink-0" />
                <span className="whitespace-nowrap text-[15px] font-semibold leading-none">Heliora Server</span>
              </span>
            }
            logoAlt="Heliora Server"
            items={items}
            cta={{ label: 'Get started', href: '/signup' }}
            cardEffect="rise"
            openOn="click"
            surface="solid"
            stagger={0.12}
            bounce={0.2}
            menuLabel
            speed={1}
            cardHeight={176}
            maxWidth={800}
            className="pointer-events-auto relative! max-w-none!"
            intro={false}
          />
        </div>
        <div className="pt-[calc(68px_+_2vh)]" />
      </main>
    </>
  )
}
