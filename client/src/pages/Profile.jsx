// import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE, QUERY_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();

  // Choose the appropriate query based on whether profileId is present or not
  const query = profileId ? QUERY_SINGLE_PROFILE : QUERY_PROFILE;

  // Use useQuery hook to fetch data
  const { loading, data } = useQuery(query, {
    variables: { profileId: profileId || "" },
  });

  // Extract user data from the response
  const user = profileId ? data?.profile : data?.me || {};

  // Redirect to login page if user is not authenticated
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // Show loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user data doesn't exist, display a message prompting the user to create a profile
  if (!user?.firstName) {
    return (
      <div>
        <h4>
          You need a profile to view this page. Please create or log into your
          account.
        </h4>
      </div>
    );
  }

  // Render user profile
  return (
    <div>
      <img
        src={user.image}
        alt={`${user.firstName}'s profile picture`}
        style={{ maxWidth: "200px", marginLeft: "auto", marginRight: "auto" }}
      />
      <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-4">
        {profileId ? `${user.firstName}'s Profile` : 'Your Profile'}
      </h2>
      {Auth.getProfile()?.data?.username === user.username && (
        <section className="text-center my-5">
          <Link to={`/profile/${user._id}/edit`}>Edit Your Profile</Link>
          <button className="btn btn-outline-info" type="submit">
            Edit Your Profile
          </button>
        </section>
      )}
    </div>
  );
};

export default Profile;
