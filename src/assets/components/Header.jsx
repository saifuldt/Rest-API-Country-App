
const Header = ({ searchQuery, handleSearchChange }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting
  };
  
  return (

    <header className=" bg-slate-400" >
      <nav className="flex flex-col md:flex-row justify-between px-6 items-center">
      <div className="logo ">
        <h1 className="text-3xl font-bold text-blue-900  ">Country App</h1>
      </div>
      <div className="Search-BTN flex  gap-20 ">
        <form onSubmit={handleFormSubmit}  className="p-2 flex items-center bg-white w-[350px] h-12 m-2 rounded-lg ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className=" bg-inherit h-10 w-full outline-none text-xl pl-4" />
        </form>
        
      </div>
      </nav>
    </header>

  )
}

export default Header