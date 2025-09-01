import { PublicPageTitle } from '../../components/PublicPageTitle';
import { CategoryCard } from '../../components/CategoryCard';
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories/CategoriesContext';

export function CategoriesPage() {
    const { publicCategories } = useContext(CategoriesContext);

    return (
        <main className='min-page-height'>
            <PublicPageTitle title='Categories' />

            <div className="container px-4" id="featured-3">
                <div className="row g-4 row-cols-1 row-cols-lg-3">
                    {publicCategories.map(category => <CategoryCard key={category.title} category={category} />)}
                </div>
            </div>
        </main>
    );
}