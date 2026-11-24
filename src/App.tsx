import { useEffect, useRef, useState } from 'react'
import CardNav, { type CardNavItem } from './components/CardNav'
import ShapeGrid from './components/ShapeGrid'
import logo from '../Assets/logo white 540p.svg'

type Page = 'beranda' | 'toko' | 'kontak'

const SITE_URL = 'https://heliora.my.id'
const OG_IMAGE = `${SITE_URL}/logo-540p.png`
const BASE_PATH = window.location.pathname.replace(/\/(?:toko|kontak)?\/?$/, '') || ''

const PAGES: Record<Page, { path: string; canon: string; title: string; description: string }> = {
  beranda: {
    path: `${BASE_PATH}/`,
    canon: '/',
    title: 'Heliora | Beranda',
    description: 'Heliora — server Minecraft Java dan Bedrock untuk komunitas. Salin alamat server dan mulai bermain.'
  },
  toko: {
    path: `${BASE_PATH}/toko/`,
    canon: '/toko/',
    title: 'Heliora | Toko',
    description: 'Jelajahi toko server Heliora untuk rank, crate, cosmetic, dan item.'
  },
  kontak: {
    path: `${BASE_PATH}/kontak/`,
    canon: '/kontak/',
    title: 'Heliora | Kontak',
    description: 'Hubungi tim Heliora untuk pertanyaan, kerja sama, dan dukungan server.'
  }
}

const ACCENT = '#ffffff'

const pageFromPath = (pathname: string): Page => {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/toko' || clean.endsWith('/toko')) return 'toko'
  if (clean === '/kontak' || clean.endsWith('/kontak')) return 'kontak'
  return 'beranda'
}

export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname))
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | null>(null)

  const navigate = (next: Page) => {
    if (next === page) return
    window.history.pushState({}, '', PAGES[next].path)
    setPage(next)
  }

  const items: CardNavItem[] = [
    {
      label: 'Beranda',
      description: 'Halaman Beranda',
      active: page === 'beranda',
      bgColor: page === 'beranda' ? ACCENT : undefined,
      textColor: page === 'beranda' ? '#111111' : undefined,
      onClick: () => navigate('beranda'),
      links: [{ label: 'Kunjungi', href: '/' }]
    },
    {
      label: 'Toko',
      description: 'Jelajahi Toko Server Heliora',
      active: page === 'toko',
      bgColor: page === 'toko' ? ACCENT : undefined,
      textColor: page === 'toko' ? '#111111' : undefined,
      onClick: () => navigate('toko'),
      links: [{ label: 'Kunjungi', href: '/toko/' }]
    },
    {
      label: 'Kontak',
      description: 'Perlu menghubungi kami?',
      active: page === 'kontak',
      bgColor: page === 'kontak' ? ACCENT : undefined,
      textColor: page === 'kontak' ? '#111111' : undefined,
      onClick: () => navigate('kontak'),
      links: [{ label: 'Kunjungi', href: '/kontak/' }]
    }
  ]

  const copyServerAddress = async () => {
    const address = 'play.heliora.my.id:29652'
    let success = false

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address)
        success = true
      }
    } catch {
      success = false
    }

    if (!success) {
      const input = document.createElement('textarea')
      input.value = address
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      success = document.execCommand('copy')
      input.remove()
    }

    if (!success) return

    setCopied(true)
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const data = PAGES[page]
    const url = `${SITE_URL}${data.canon}`

    document.title = data.title

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, key)
        document.head.appendChild(element)
      }
      element.content = content
    }

    setMeta('name', 'description', data.description)
    setMeta('name', 'robots', 'index, follow, max-image-preview:large')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'Heliora')
    setMeta('property', 'og:title', data.title)
    setMeta('property', 'og:description', data.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', data.title)
    setMeta('name', 'twitter:description', data.description)
    setMeta('name', 'twitter:image', OG_IMAGE)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [page])

  useEffect(() => {
    const handlePopState = () => setPage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    }
  }, [])

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
            logoHref={PAGES.beranda.path}
            onLogoClick={event => {
              event.preventDefault()
              navigate('beranda')
            }}
            items={items}
            cta={{
              label: (
                <span className="relative inline-flex w-[176px] items-center justify-center">
                  <span
                    aria-hidden={copied}
                    className={`whitespace-nowrap transition-opacity duration-200 ease-out ${copied ? 'opacity-0' : 'opacity-100'}`}
                  >
                    Salin Alamat Server
                  </span>
                  <span
                    aria-hidden={!copied}
                    className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-opacity duration-200 ease-out ${copied ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Alamat Server Dicopy!
                  </span>
                </span>
              ),
              onClick: copyServerAddress,
              keepMenuOpen: true
            }}
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
