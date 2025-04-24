import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'; // MUI Box for container/form
import TextField from '@mui/material/TextField'; // MUI Input field
import InputAdornment from '@mui/material/InputAdornment'; // To add icon inside TextField
import IconButton from '@mui/material/IconButton'; // Clickable icon button
import SearchIcon from '@mui/icons-material/Search'; // MUI Search Icon

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      // setKeyword(''); // Optional: Clear keyword after search
    } else {
      navigate('/menu'); // Navigate home if search is empty
    }
  };

  return (
    // Use Box as the form container with onSubmit
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        width: { xs: '90%', sm: 300, md: 400 }, // Responsive width
        mx: 'auto', // Center the search box
        my: 2, // Add some vertical margin (adjust as needed)
        display: 'flex', // Use flex for alignment (optional, TextField is block by default)
      }}
      noValidate // Prevents browser default validation
      autoComplete="off" // Disable browser autocomplete
    >
      <TextField
        fullWidth // Take full width of the parent Box
        variant="outlined" // Standard outlined style
        size="small" // Makes the text field slightly smaller (optional)
        placeholder="Search Products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        InputProps={{
          // Add the search icon button at the end
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit" // Make icon button submit the form
                aria-label="search products"
                edge="end" // Align to the end
                // sx={{ color: 'primary.main' }} // Optional: Use theme color
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: '20px', // More rounded corners (optional)
             // Optional: Softer background
             bgcolor: 'background.paper'
          }
        }}
        // Optional: Style the TextField itself
        // sx={{
        //   '& .MuiOutlinedInput-root': {
        //     '&.Mui-focused fieldset': {
        //       borderColor: 'green', // Custom focus color
        //     },
        //   },
        // }}
      />
    </Box>
  );
};

export default SearchBox;
/////////////////// IMAD SEARCH BOX ////////////////////
// import React from 'react'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';


// const SearchBox = ({history}) => {

//     const [keyword , setKeyword] = useState('')
//     const navigate = useNavigate();


//     const submitHandler = (e) => {
//         e.preventDefault()
//         if (keyword.trim()) {
//             navigate(`/search/${keyword}`);
//           } else {
//             navigate('/');
//           }
//         }


//   return (
// <form className="w-[300px] mx-auto" onSubmit={submitHandler}>
//   <div className="flex rounded-md border-2 border-green-600 overflow-hidden w-full">
//     <input
//       type="text"
//       onChange={(e) => setKeyword(e.target.value)}
//       placeholder="Search Products..."
//       className="w-full outline-none bg-white text-gray-700 text-sm px-4 py-2 h-10"
//     />
//     <button
//       type="submit"
//       className="flex items-center justify-center bg-green-600 hover:bg-green-700 px-3 h-10 transition-all duration-200"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 192.904 192.904"
//         width="16px"
//         className="fill-white"
//       >
//         <path
//           d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"
//         ></path>
//       </svg>
//     </button>
//   </div>
// </form>



//   )
// }

// export default SearchBox
/////////////////// IMAD SEARCH BOX ////////////////////