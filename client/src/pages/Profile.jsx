// Assuming React is needed for JSX transformation, even if not explicitly used in this file.
import React from "react"; 
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();
  // Redirect to login page if user is not authenticated
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  // Use useQuery hook to fetch data
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { profileId: profileId },
  });


  // Extract user data from the response
  const user = data?.user || {};

  // Show loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("user", user);
  // If user data doesn't exist, display a message prompting the user to create a profile
  if (!user?.name) {
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
        alt={`${user.name}'s profile picture`}
        style={{ maxWidth: "200px", marginLeft: "auto", marginRight: "auto" }}
      />
      <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-4">
        {profileId ? `${user.name}'s Profile` : "Your Profile"}
      </h2>
      {Auth.getProfile()?.data?.email  === user.email && (
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
