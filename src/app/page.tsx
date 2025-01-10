import { Metadata } from 'next'
import Home from './home/page'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://audiologia-mef.vercel.app' : 'http://localhost:3000'),
    title: 'Audiología MEF',
    description: 'Especialistas en audición y salud auditiva.',
    openGraph: {
        title: 'Audiología MEF',
        description: 'Especialistas en audición y salud auditiva.',
        images: ['/logo_515x515.png'],
        url: 'https://www.audiologia-mef.vercel.app',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Audiología MEF',
        description: 'Especialistas en audición y salud auditiva.',
        images: ['/logo_515x515.png'],
    },
}

const HomePage = async () => {
  
    return <Home />
}

export default HomePage
