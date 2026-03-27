import { getMovies } from "@/lib/api"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const queryParam = "&query=" + query
        
    const pelis = await getMovies("search/movie", queryParam, 1);
    const onlyTitles = pelis.results.map(peli => { // Solo saca los titulos
        return peli.title
    });
    // Coge los titulos unicos (Sin repetidos)
    const titulosUnicos = [...new Set(onlyTitles)]; // Los ... son necesarios paras que sea un array

    // Los devuelve
    return new Response(JSON.stringify(titulosUnicos), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
