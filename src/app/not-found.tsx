import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"

export async function generateMetadata() {
    const title = '404 - Nada por aquí...'
    const description = 'La página que buscáss no se encuentra. Verificá que la URL sea correcta o volvé a Home.'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    }
}

export default function NotFound() {
    return <>
        <Header />
        <div className="page__container">
            <h1 className="page__title">404 - La página que buscás no existe</h1>
            <p>Verificá que la URL sea correcta o <a href="https://audiologia-mef.vercel.app/">volvé a Home</a>.</p>
        </div>
        <Footer />
    </>
}