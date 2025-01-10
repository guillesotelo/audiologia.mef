// Import necessary modules
import { getEditions } from '../../../services'
import { removeTime, sortArray } from '../../../helpers'
import { editionType, articleType } from '../../types'
import Article from './article'

// Dynamic metadata based on article
export async function generateMetadata({ params }: { params: { articleSlug: string } }) {
    const { articleSlug } = params

    const editions = await getEditions()
    let articles: articleType[] = []

    if (editions) {
        const orderedEditions = sortArray(editions.filter((e: editionType) => e.published), 'title', true)
        orderedEditions.forEach((edition: editionType) => {
            articles = articles.concat(JSON.parse(edition.articles || '[]'))
            articles = articles.concat(JSON.parse(edition.spaArticles || '[]'))
        })
    }

    const matchedArticle = articles.find((article: articleType) => article.slug === articleSlug) || null

    if (matchedArticle) {
        return {
            title: removeTime(matchedArticle.title || ''),
            description: matchedArticle.content,
            openGraph: {
                title: matchedArticle.title,
                description: matchedArticle.content,
                images: [{ url: matchedArticle.image || '' }],
            },
        }
    }

    return {
        title: 'Article Not Found',
    }
}

export default async function ArticlePage({ params }: { params: { articleSlug: string } }) {
    const { articleSlug } = params

    const editions = await getEditions()
    let articles: articleType[] = []

    if (editions) {
        const orderedEditions = sortArray(editions.filter((e: editionType) => e.published), 'title', true)
        orderedEditions.forEach((edition: editionType) => {
            articles = articles.concat(JSON.parse(edition.articles || '[]'))
            articles = articles.concat(JSON.parse(edition.spaArticles || '[]'))
        })
    }

    const matchedArticle = articles.find((article: articleType) => article.slug === articleSlug) || null

    // Client Side Rendering Component:
    return <Article article={matchedArticle} />
}
