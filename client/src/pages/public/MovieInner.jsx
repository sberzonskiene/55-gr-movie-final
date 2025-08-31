import { useParams } from 'react-router';
import { useContext } from 'react';
import { MoviesContext } from '../../context/movies/MoviesContext';
import defaultImgUrl from '../../assets/default.png';
import notFoundImgUrl from '../../assets/not-found.webp';
import { CategoriesContext } from '../../context/categories/CategoriesContext';
import { formatDate } from '../../lib/formatDate';
import { formatDuration } from '../../lib/formatDuration';
import { formatRating } from '../../lib/formatRating';
import { SERVER_ADDRESS } from '../../env';

export function MovieInnerPage() {
    const { movie } = useParams();
    const { getPublicMovieByUrlSlug } = useContext(MoviesContext);
    const { publicCategories } = useContext(CategoriesContext);

    const movieData = getPublicMovieByUrlSlug(movie);

    if (!movieData) {
        return (
            <main className="min-page-height">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-5">
                            <h1 className="display-1">404</h1>
                            <p className="fs-2">Movie not found</p>
                        </div>
                        <img src={notFoundImgUrl} alt="Movie thumbnail" className="col-12 col-lg-3 object-fit-contain" />
                    </div>
                </div>
            </main>
        );
    }

    const categoryData = publicCategories.find(c => c.id === movieData.category_id);

    if (!categoryData) {
        return (
            <main className="min-page-height">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-5">
                            <h1 className="display-1">404</h1>
                            <p className="fs-2">Movie not found</p>
                        </div>
                        <img src={notFoundImgUrl} alt="Movie thumbnail" className="col-12 col-lg-3 object-fit-contain" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-page-height">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-5">
                        <strong className="d-inline-block mb-2 text-primary-emphasis">{categoryData.title}</strong>
                        <h1 className="display-2">{movieData.title}</h1>
                        <p className="card-text mb-5">{movieData.description}</p>
                        <div className="mb-1 text-body-secondary">Released: {formatDate(movieData.release_date)}</div>
                        <div className="mb-1 text-body-secondary">Duration: {formatDuration(movieData.duration_in_minutes)}</div>
                        <div className="mb-1 text-body-secondary">Rating: {formatRating(movieData.rating)}</div>
                    </div>
                    <img src={movieData.img ? (SERVER_ADDRESS + '/img/movies/' + movieData.img) : defaultImgUrl} alt="Movie thumbnail" className="col-12 col-lg-4 object-fit-contain" />
                </div>
            </div>
        </main>
    );
}