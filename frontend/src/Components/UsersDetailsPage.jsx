import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getdata } from "../Redux/action";
import { VStack, Heading, Select, HStack, Button, Flex } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
} from "@chakra-ui/react";

const UserDetailsPage = () => {
  let [searchparams, setsearchparams] = useSearchParams();
  let [gender, setgender] = useState(searchparams.getAll("gender")[0] || "");
  let [age, setage] = useState(searchparams.getAll("age")[0] || "");
  let [page, setpage] = useState(searchparams.getAll("page")[0] || 1);
  let dispatch = useDispatch();
  let { userdata, totalpages, user_loading } = useSelector(
    (state) => state
  );

  
  useEffect(() => {
    setsearchparams({ gender: gender, age: age, page: page });
    let params = {
      params: {
        gender: gender,
        age: age,
      },
    };
    dispatch(getdata(page, params));
  }, [gender, page, age]);
  
  let handlechange = (e) => {
    setgender(e.target.value);
    setpage(1);
  };
  console.log(gender);
  let handlechangeage = (e) => {
    setage(e.target.value);
    setpage(1);
  };
  let buttons = new Array(totalpages).fill(0).map((el, i) => i + 1);
  return (
    <div style={{ marginBottom: "30px", width: "100%" }}>
      
      {/* <VStack
        border="1px solid black"
        maxW={"100%"}
        mb="30px"
        bg="black"
        height="80px"
        spacing={"20px"}
      > */}
        {" "}
        <Flex justifyContent={"space-evenly"} spacing={"20px"} border="1px solid black"
        maxW={"100%"}
        mb="30px"
        bg="teal"
        height="80px">
        <Link to="/"><Heading mt="15px" color="white">Back to Home Page</Heading></Link>
        <Heading mt="15px" color="white">
          User Details Page
        </Heading>
        </Flex>
      {/* </VStack> */}

      {user_loading ? (
        <Spinner />
      ) : (
        <VStack spacing={"30px"} width={"100%"}>
          <HStack spacing={"70px"} width={"45%"}>
            <Select
              placeholder="Filter By Gender"
             
              size="lg"
              onChange={handlechange}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Select
              placeholder="Filter By Age"
              variant="outline"
              size="lg"
              onChange={handlechangeage}
              name=""
              id=""
            >
              <option value="">All</option>
              <option value="18-25">18 to 25</option>
              <option value="25-50">25 to 50</option>
              <option value="50-80">50 to 80</option>
            </Select>
          </HStack>
          <div>
            <TableContainer width="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>PROFILE</Th>
                    <Th>GENDER</Th>
                    <Th>EMAIL</Th>
                    <Th>DOB</Th>
                    <Th isNumeric>AGE</Th>
                    <Th>LOCATION</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userdata.map((el) => {
                    return (
                      <Tr key={el._id}>
                        <Td>
                          <Avatar
                            size="md"
                            name='Kent Dodds'
                            src={el.picture.thumbnail}
                          />
                        </Td>
                        <Td>{el.gender}</Td>
                        <Td>{el.email}</Td>
                        <Td>{el.dob.date}</Td>
                        <Td isNumeric>{el.dob.age}</Td>
                        <Td>{el.location.city}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <HStack
            spacing="10rem"
            // width={"42%"}
            marginLeft={"1rem"}
            // margin={"auto"}
            overflowX={"scroll"}
            gap={"1rem"}
          >
            {buttons.map((el) => {
              return (
                <button style={{backgroundColor:"teal",width:"3rem",borderRadius:"5px",height:"2rem",spacing:"2rem",margin:"auto"
            }}
                  disabled={page===1}
                 
                  onClick={() => {
                    setpage(el);
                  }}
                  key={el}
                >
                  {el}
                </button>
              );
            })}
          </HStack>
        </VStack>
      )}
    </div>
  );
};

export default UserDetailsPage;