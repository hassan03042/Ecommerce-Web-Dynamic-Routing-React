function CategoryChip({ category, isChosen, onClick }) {
    const { name } = category;
    return (
      <div
        onClick={onClick}
        className={`${
          isChosen ? "bg-orange-400 text-white" : "bg-white text-black"
        }
        mt-5 
        p-2
          cursor-pointer
          hover:bg-orange-200
          border-orange-400 border px-4 rounded-md`}
      >
        <h1>{name}</h1>
      </div>
    );
  }
  
  export default CategoryChip;