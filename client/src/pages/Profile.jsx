// Assuming React is needed for JSX transformation, even if not explicitly used in this file.
import React from "react"; 
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE, QUERY_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();
  
  // Determine which query to use based on presence of profileId
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_PROFILE, 
    profileId ? { variables: { profileId } } : {}
  );

  // Adjusting based on the expected structure of data for each query
  const user = profileId ? data?.profile : data?.me;

  // Redirect if not logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handling case when user data is not available
  if (!user) {
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
      <h2>{profileId ? `${user.name}'s Profile` : "Your Profile"}</h2>
      {/* Assuming `user.image` exists. Adjust accordingly. */}
      <img src={user.image || "default-profile.png"} alt="Profile" style={{ maxWidth: "200px" }} />
      {/* Display user details */}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Editing profile - Ensure proper access control on the server-side */}
      {Auth.getProfile()?.data?._id === user._id && (
        <div className="text-center my-5">
          <Link to={`/profile/${user._id}/edit`}>Edit Your Profile</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
