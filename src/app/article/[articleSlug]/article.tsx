'use client'

import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { AppContext } from "src/app/context/AppContext"
import { articleType } from "src/app/types"
import Loader from "src/components/Loader/Loader"
import { getDomain, parseArticleDate, removeTime } from "src/helpers"

type Props = {
    article: articleType | null

}

export default function Article({ article }: Props) {
    const { lang, isMobile, darkMode } = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        if (article === null) return router.back()
    }, [article])

    return (
        <div className="articleviewer__container">
            {!article ? (
                <Loader label={lang === 'es' ? 'Cargando artículo...' : 'Loading article...'} color='#114b5f' />
            ) : (
                <>
                    <h1 className="articleviewer__title">{removeTime(article.title || '')}</h1>
                    {article.editionTitle ? <p className="articleviewer__edition" onClick={() => router.push(`/edition/${article.editionTitle}`)}>{parseArticleDate(article.editionTitle, lang, true)}</p> : ''}
                    <div className="articleviewer__image-wrapper" style={{ width: isMobile ? '' : '50vw' }}>
                        <div className="articleviewer__image-gradient" />
                        <img src={article.image || ''} alt={article.title || ''} className="page__img" draggable={false} />
                    </div>
                    {getDomain(article.image || '') && (
                        <p className="articleviewer__image-source">
                            <a href={article.image} target="_blank">
                                {`${lang === 'es' ? 'Fuente' : 'Source'}: ${getDomain(article.image || '')}`}
                            </a>
                        </p>
                    )}
                    <p className={`articleviewer__text${darkMode ? '--dark' : ''}`}>{article.content}</p>
                    <a className="articleviewer__link" href={article.link} target="_blank">
                        {lang === 'es' ? 'Leer el artículo completo' : 'Read full article'}
                    </a>
                </>
            )}
        </div>
    )
}
