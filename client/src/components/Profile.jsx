import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const ProfilePage = () => {
  const { profileId } = useParams();

  // check if logged in
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId || "" },
    }
  );
  // check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};
  //Use React Router's <Navigate/> to send users to the login  page if they are not yet authenticated.
  if (
    !Auth.loggedIn() &&
    Auth.getProfile(sessionStorage.getItem("token")).data.id !== user.id
  ) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.name) {
    return (
      <h4>
        You need a profile to view this page. Please create or log into your
        account.
      </h4>
    );
  }
  return (
    <div>
      <img
        src={user.image}
        alt={`${user.name}'s profile picture`}
        style={{ maxWidth: "200px", marginLeft: "auto", marginRight: "auto" }}
      />
      //user's page
      <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-4">
        {!profileId ? `Your Profile` : `${user.name}'s Profile`}
      </h2>
      {/* If the current user is looking at their own profile, let them edit it */}
      {Auth.loggedIn() && Auth.getProfile().data.username === user.username && (
        <section className="text-center my-5">
          <Link to={`/profile/${user._id}/edit`}></Link>
          <Button variant="outline-info" type="submit">
            Edit Your Profile
          </Button>
        </section>
      )}
    </div>
  );
};
export default ProfilePage;
