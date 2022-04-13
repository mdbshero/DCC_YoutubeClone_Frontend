import axios from "axios";



const SearchBar = (props) => {
    
function handleSubmit(event){
    event.preventDefault()
    let query = document.getElementById("searchBarText").value
    console.log(query)
    props.parseSearch(query)
}
    return ( 
        <form className="d-flex">
            <input className="form-control me-sm-2" placeholder="Enter Search" type="text" name="Search" id="searchBarText" onKeyUp={function(event) {if (event.key == 'Enter'){
                handleSubmit(event)
            }}}/>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </form>
     );
}
 
export default SearchBar;