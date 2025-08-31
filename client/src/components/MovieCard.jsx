import { useContext } from 'react';
import { CategoriesContext } from '../context/categories/CategoriesContext';
import { formatRating } from '../lib/formatRating';
import { formatDuration } from '../lib/formatDuration';
import { formatDate } from '../lib/formatDate';
import defaultImgUrl from '../assets/default.png';
import { SERVER_ADDRESS } from '../env';
import { Link } from 'react-router';

export function MovieCard({ movie }) {
    const { publicCategories } = useContext(CategoriesContext);
    const categoryData = publicCategories.find(c => c.id === movie.category_id);

    if (!categoryData) {
        return;
    }

    return (
        <div className="col-12 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col-12 col-lg-8 p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary-emphasis">{categoryData.title}</strong>
                    <h3 className="mb-0">{movie.title}</h3>
                    <p className="card-text mb-auto">{movie.description}</p>
                    <div className="mb-1 text-body-secondary">Released: {formatDate(movie.release_date)}</div>
                    <div className="mb-1 text-body-secondary">Duration: {formatDuration(movie.duration_in_minutes)}</div>
                    <div className="mb-1 text-body-secondary">Rating: {formatRating(movie.rating)}</div>
                    <Link to={"/movies/" + movie.url_slug} className="icon-link gap-1 icon-link-hover stretched-link">
                        Continue reading
                    </Link>
                </div>
                <div className="col-4 d-none d-lg-block">
                    <img className="w-100 h-100 object-fit-cover" src={movie.img ? (SERVER_ADDRESS + '/img/movies/' + movie.img) : defaultImgUrl} alt="Matrix" />
                </div>
            </div>
        </div>
    );
}