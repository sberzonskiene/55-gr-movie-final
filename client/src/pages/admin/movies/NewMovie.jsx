import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { AdminMovieForm } from "../../../components/forms/AdminMovieForm";
import { SERVER_ADDRESS } from "../../../env";

export function AdminNewMoviePage() {
    return (
        <main>
            <AdminPageTitle title="New movie" />

            <div className="container">
                <div className="row">
                    <AdminMovieForm
                        api={SERVER_ADDRESS + '/api/admin/movies'}
                        method="POST" />
                </div>
            </div>
        </main>
    );
}