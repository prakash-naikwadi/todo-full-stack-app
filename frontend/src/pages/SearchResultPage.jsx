import React from "react";
import Card from "../components/shared/Card";

const SearchResultPage = ({ searchInput, todos }) => {
  if (!searchInput) {
    return (
      <p className="font-bold text-center bg-gray-200 flex-1 pt-4">
        Please Enter Some Text...
      </p>
    );
  }

  // const filteredTodoData = todos.filter((item) => {
  //   return item.title.toLowerCase().includes(searchInput);
  // });

  // Filtered Data For Showing Searched Results

  const filteredTasksData = todos.map((item) => {
    return item.tasks.filter((item) => {
      return item.description.toLowerCase().includes(searchInput);
    });
  });

  const isEmpty = filteredTasksData.reduce((prev, item) => {
    return prev + item.length;
  }, 0);

  return (
    <div className="min-w-[60%] md:min-w-[75%] bg-gray-200 p-4 h-screen overflow-y-auto ">
      <div className="font-bold text-center">Search Results</div>
      <div className="flex flex-wrap justify-center gap-2 p-2">
        {isEmpty === 0 ? (
          <p key={"aa286d811e9365b622a42a9483741"}>No Cards Found ...!</p>
        ) : (
          filteredTasksData.map((item) => {
            return item.map((item) => {
              return <Card task={item} key={item._id} />;
            });
          })
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
