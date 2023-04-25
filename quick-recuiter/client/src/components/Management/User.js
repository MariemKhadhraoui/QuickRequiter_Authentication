import React, { useState, useEffect, useRef } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as api from '../../api/index.js';
import VerifiedIcon from "@material-ui/icons/VerifiedUser.js";
import GppBadIcon from "@material-ui/icons/NotInterested.js";
import { Button, Table } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import useStyles from './styles';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
const User = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [formType, setFormType] = useState("add");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentPage = useRef();
  const [pageCount, setPageCount] = useState(1);
  const [msg, setMsg] = useState("");
  const styles = useStyles();
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userList, setUserList] = useState([]);
  const [cb, setCb] = useState(false);
  const [sortBy, setSortBy] = useState("asc");


  useEffect(() => {
    currentPage.current = 1;

     getPaginatedUsers(currentPage, limit);
  }, [cb]);

  
  const saveUser = async (e) => {
    e.preventDefault();
    
    try {
      if(formType === "add"){
        await api.addUser({
          firstName,
          lastName,
          email,
          password,
        });
      }else{
        await api.updateUser(selectedUser,{
          firstName,
          lastName,
          email,
          password,
        });
        setFormType("add");
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setCb(!cb);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async(candidate) => {
    setSelectedUser(candidate._id);
    const names = candidate.name.split(" ");
    setFirstName(names[0]);
    setLastName(names[1]);
    setEmail(candidate.email);
    setPassword(candidate.password);
    setFormType("update");
    // setData(candidate);
  }
  const handleSortBy = () => {
    // Si le tri est actuellement par ordre alphabétique croissant,
    // changer l'ordre de tri en décroissant, et vice versa
    if (sortBy === "asc") {
      setSortBy("desc");
    } else {
      setSortBy("asc");
    }
  };
  const sortedUsers = userList.sort((a, b) => {
    if (sortBy === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });


  /*useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.listUsers();
        setMsg(data.message);
        setError("");
        setUserList(data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setMsg("");
        }
      }
    }
    fetchData();
  }, [cb]);*/

   const handlePageClick = (e)=>{
   currentPage.current = e.selected + 1;
    getPaginatedUsers(currentPage, limit);
   };

   function changeLimit(){
    currentPage.current=1;
    getPaginatedUsers(currentPage, limit);
  }

  async function getPaginatedUsers(currentPage, limit) {
    try {
      const { data } = await api.paginatedUsers(currentPage, limit);
      //const data = await response.json();
      
  
      setPageCount(data.pageCount);
      setData(data.result);
      setUserList(data.result);
    } catch (error) {
      console.error(error);
    }
  }
  const handleVerify = async (id) => {
    try {
      const { data } = await api.verifyUser(id);
      setMsg(data.message);
      setError("");
      setCb(!cb);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };
  async function handleDeleteUser(userId) {
    try {
      await api.deleteUser(userId);
      setCb(!cb);
    } catch (err) {
      console.error(err);
    }
  }
  const handleUnVerify = async (id) => {
    try {
      const { data } = await api.unverifyUser(id);
      setMsg(data.message);
      setError("");
      setCb(!cb);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  }
  /*const searchHandle = async (event) => {
    try {
      let key =event.target.value;
      if (key) {
        
        let data = await api.search(event);
        
        
        if (data) {
          setUserList();
          setData(result);
        }
      }
    } catch (err) {
     
      console.error(err);
    }
  };*/
 
    
  
  const handleSearchTermChange = event => {
      setSearchTerm(event.target.value);
  };
  
  const handleSearchSubmit = event => {
      event.preventDefault();
      const results = data.filter(data => data.name.includes(searchTerm));
      setUserList(results);
      setData(results);
  };

  
  return (
    <>
    <div className={styles.main_container}>
    <nav className={styles.navbar}>
      <h1>Users Management</h1>
    </nav>
    <div className={styles.Papper}>
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">firstName</label>
            <div className="control">
              <input 
                type="text"
                className={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">lastName</label>
            <div className="control">
              <input
                type="text"
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">email</label>
            <div className="control">
              <input
                type="text"
                className={styles.input}
                value={email}
                disabled={formType === "update"}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">password</label>
            <div className="control">
              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            </div>
          <div className="field">
            <div className="control">
              <button type="submit" className={styles.buttonissuccess}>
                {formType === "add" ? "Add User": "Update User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>


  <button onClick={handleSortBy}>
  Sort By Name ({sortBy === "asc" ? "A-Z" : "Z-A"})
</button>
<br></br>
<div>
      <form onSubmit={handleSearchSubmit}>
      <label style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'red' }}>
  Search     :
  <input type="text" placeholder="Search User" className={styles.search} onChange={handleSearchTermChange} />
</label>

        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(user => (
          <li k={user.email}>
            {data.email} ({data.email})
          </li>
        ))}
      </ul>
    </div>
    
    <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>full Name</TableCell>
              <TableCell>role</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {sortedUsers.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.email}</TableCell>

                <TableCell>
                    <Button
                      onClick={() => handleUpdate(row)}
                      style={{ backgroundColor: "#0000FF", color: "white" }}
                    >
                      Update
                    </Button>
                  &nbsp;
                  <Button
                    onClick={() => handleDeleteUser(row._id)}
                    style={{
                      backgroundColor: "rgb(197, 18, 18)",
                      color: "white",
                    }}
                  >
                    Delete
                  </Button>&nbsp;
              {!row.verified ? (
                <Button
                  onClick={() => handleVerify(row._id)}
                  style={{ backgroundColor: "#4CAF50", color: "white" }}
                >
                  Verify
                </Button>
              ) : (
                <Button
                  onClick={() => handleUnVerify(row._id)}
                  style={{ backgroundColor: "rgb(197, 18, 18)", color: "white" }}
                >
                  Unverify
                </Button>
              )}
            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <ReactPaginate
  breakLabel="..."
  nextLabel="next >"
  onPageChange={handlePageClick}
  pageRangeDisplayed={8}
  pageCount={pageCount}
  previousLabel="< previous"
  renderOnZeroPageCount={null}
  marginPagesDisplayed={8}
  containerClassName={"pagination justify-content-center"}
  pageClassName={styles.pageitem}
  pageLinkClassName={styles.pagelink}
  previousClassName={styles.pageitem}
  nextClassName={styles.pageitem}
  breakClassName={styles.pageitem}
  nextLinkClassName={styles.pagelink}
  previousLinkClassName={styles.pagelink}
  activeClassName={styles.active}
  forcePage={currentPage.current - 1}
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    
    
      
    
  }}
/>

      
  <div>
      <input placeholder="Limit" className={styles.search} onChange={(e) => setLimit(e.target.value)} />
      <button onClick={changeLimit}>Set Limit</button>
   </div>
  </>
  );
};

export default User;
