// Assuming React is needed for JSX transformation, even if not explicitly used in this file.
import React from "react"; 
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();
  
  // Determine which query to use based on presence of profileId
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_PROFILE, 
    profileId ? { variables: { profileId } } : {}
  );


  // Choose the appropriate query based on whether profileId is present or not
  const query = profileId ? QUERY_SINGLE_PROFILE : QUERY_USER;

  // Use useQuery hook to fetch data
  const { loading, data } = useQuery(query, {
    variables: { profileId: profileId || "" },
  });

  // Extract user data from the response
  const user = profileId ? data?.profile : data?.me || {};


  // Redirect if not logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handling case when user data is not available
  if (!user?.firstName) {
    return (
      <div>
        <h4>
          You need a profile to view this page. Please log in or sign up.
        </h4>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  // User profile display
  return (
    <div>
      <img
        src={user.image}
        alt={`${user.firstName}'s profile picture`}
        style={{ maxWidth: "200px", marginLeft: "auto", marginRight: "auto" }}
      />
      <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-4">
        {profileId ? `${user.firstName}'s Profile` : "Your Profile"}
      </h2>
      {Auth.getProfile()?.data?.username === user.username && (
        <section className="text-center my-5">

          <Link to={`/profile/${user._id}/edit`}>Edit Your Profile</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
