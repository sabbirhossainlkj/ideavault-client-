import React from "react";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(id)

  return (
    <div>
      <h2>idea details page</h2>
    </div>
  );
};

export default IdeaDetailsPage;
