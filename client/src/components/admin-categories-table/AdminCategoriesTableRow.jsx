import { useContext } from 'react';
import { Link } from 'react-router';
import { CategoriesContext } from '../../context/categories/CategoriesContext';
import { SERVER_ADDRESS } from '../../env';

export function AdminCategoriesTableRow({ category }) {
    const { deletePublicCategory, deleteAdminCategory } = useContext(CategoriesContext);

    function handleDeleteClick() {
        fetch(SERVER_ADDRESS + '/api/admin/categories/' + category.url_slug, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    deletePublicCategory(category.url_slug);
                    deleteAdminCategory(category.url_slug);
                }
            })
            .catch(console.error);
    }

    return (
        <tr>
            <th scope="row">{category.id}</th>
            <td><Link to={"/admin/categories/" + category.url_slug}>{category.title}</Link></td>
            <td>{category.url_slug}</td>
            <td>{category.description}</td>
            <td>{category.moviesCount}</td>
            <td>
                {
                    category.status_name === 'published'
                        ? <span className="badge text-bg-success">Published</span>
                        : <span className="badge text-bg-warning">Draft</span>
                }

            </td>
            <td className="d-flex gap-3">
                <Link className="btn btn-primary btn-sm" to={`/admin/categories/${category.url_slug}/edit`}>Edit</Link>
                <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    );
}