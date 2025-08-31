import { useContext } from 'react';
import { Link } from 'react-router';
import { CategoriesContext } from '../../context/categories/CategoriesContext';
import { formatDuration } from '../../lib/formatDuration';
import defaultImg from '../../assets/default.png';
import { SERVER_ADDRESS } from '../../env';
import { MoviesContext } from '../../context/movies/MoviesContext';

export function AdminMoviesTableRow({ movie }) {
    const { adminCategories } = useContext(CategoriesContext);
    const { deletePublicMovie, deleteAdminMovie } = useContext(MoviesContext);

    if (!adminCategories.length) {
        return;
    }

    const imgPath = movie.img ? (SERVER_ADDRESS + '/img/movies/' + movie.img) : defaultImg;

    function handleDeleteClick() {
        fetch(SERVER_ADDRESS + '/api/admin/movies/' + movie.url_slug, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    deletePublicMovie(movie.url_slug);
                    deleteAdminMovie(movie.url_slug);
                }
            })
            .catch(console.error);
    }

    return (
        <tr>
            <th scope="row">{movie.id}</th>
            <td><img src={imgPath} alt="Movie thumbnail" style={{ maxHeight: '4rem' }} /></td>
            <td><Link to={"/admin/movies/" + movie.url_slug}>{movie.title}</Link></td>
            <td>{
                movie.description
                    ? <span className="badge text-bg-success">Provided</span>
                    : <span className="badge text-bg-warning">Empty</span>
            }</td>
            <td>{
                movie.duration_in_minutes
                    ? formatDuration(movie.duration_in_minutes)
                    : <span className="badge text-bg-warning">Not selected</span>
            }</td>
            <td>
                {
                    movie.category_id
                        ? adminCategories.find(c => c.id === movie.category_id).title
                        : <span className="badge text-bg-warning">Not selected</span>
                }
            </td>
            <td>
                {
                    movie.status_name === 'published'
                        ? <span className="badge text-bg-success">Published</span>
                        : <span className="badge text-bg-warning">Draft</span>
                }
            </td>
            <td>
                <div className="d-flex gap-3">
                    <Link className="btn btn-primary btn-sm" to={`/admin/movies/${movie.url_slug}/edit`}>Edit</Link>
                    <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">Delete</button>
                </div>
            </td>
        </tr >
    );
}
