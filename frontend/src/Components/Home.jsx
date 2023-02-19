import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchdata,deletedata } from '../Redux/action'
import {Button,VStack,Heading, Stack, Box} from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'
const Home = () => {
    const navigate=useNavigate()
    const toast = useToast()
    const dispatch=useDispatch()
    const {loading,delete_error,success,user_error,userdata}=useSelector(state=>state)

    let post_Data_toDatabase=()=>{
         dispatch(fetchdata(url))
        if(loading){
            alert("fetching data")
        }
        if(success){
            toast({
                position:"top",
                title: 'Data fetched.',
                description: "data fetched  from api.",
               
                status: 'success',
                duration: 1000,
                isClosable: true,
              })
        }
    }

    let url="https://randomuser.me/api/?results=100"
    let deleteall=()=>{
        // alert("All data deleted")

dispatch(deletedata())
toast({
    position:"top",
    title: 'Data Deleted.',
    description: "data deleted.",
   
    status: 'success',
    duration: 1000,
    isClosable: true,
  })


    }

    let getuserdetails=()=>{
navigate("/userdetails")
    }
   
  return (
    <div>
       <Link to="/"> <Stack border="1px solid black" bg="teal" height="80px" spacing={"20px"}> <Heading mt="15px" color="white">Home Page</Heading></Stack>
       </Link>
    <Box style={{display:'flex',gap:"20px",marginLeft:"180px", marginTop:"2rem"}}>
       
        <Button onClick={post_Data_toDatabase} colorScheme='pink' size='md' height="70px" width="300px"  >Fetch details</Button>
        <Button colorScheme='pink' size='md' height="70px" width="300px"  onClick={deleteall}>Delete All users details</Button>
        <Button colorScheme='pink' size='md' height="70px" width="300px"  onClick={getuserdetails}>User details</Button>
    </Box>
    </div>
  )
}

export default Home