import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { handleIsLoadingToggle } from '../../rtk/features/commonSlice';
import TicketCard from './TicketCard/TicketCard';
import axios from 'axios';
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [allDate, setAllData] = useState([]);
  const { auth,common} = useSelector((state) => state);
  const dispatch = useDispatch()
  useEffect(() => {
    const getOrders = async () => {
      dispatch(handleIsLoadingToggle())
      try {
        const { data } = await axios.get(
          `http://localhost:9999/user/orders/${auth.userInfo._id}`
        );
        setAllData(data)
        setOrders(data.order);
        dispatch(handleIsLoadingToggle())
        
      } catch (error) {
       console.log(error) 
      }

    };
    getOrders();
  }, []);
  return (
    <>
      <Box>
        <Container>
          {!common.isLoading ? (
            <Grid container spacing={1} p={1}>
              {orders.map((order) => {
                return (
                  <Grid key={order._id} item xs={12}>
                    <TicketCard Ticket={order} allDate={allDate} />
                  </Grid>
                );
              })}
              {orders.length <= 0 && (
                <Typography
                fontSize={{xs:15,sm:20,md:25,lg:30}}
                fontWeight={{xs:600,md:700}}
                textAlign="center"
                width="100%"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  Your Order is currently empty.
                </Typography>
              )}
            </Grid>
          ) : (
            <CircularProgress
              sx={{
                color: "#0071eb",
                width: {
                  xs: "100px !important",
                  md: "150px !important",
                },
                height: {
                  xs: "100px !important",
                  md: "150px !important",
                },
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) !important",
              }}
            />
          )}
        </Container>
      </Box>
    </>  )
}

export default Order
// import React, { useLayoutEffect, useState } from "react";
// import {
//   Box,
//   CircularProgress,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import TicketCard from "./TicketCard/TicketCard";
// import { handleErrorMessage, handleIsError, handleIsLoading } from "../../rtk/features/commonSlice";
// const OrderPageContainer = () => {
//   const { auth, common } = useSelector((state) => state);
//   const [Tickets, setTickets] = useState([]);
//   const dispatch = useDispatch()
//   // useLayoutEffect(() => {
//   //   const wishList = async () => {
//   //     dispatch(handleIsLoading(true))
//   //     try {
//   //       const res = await axios.get(`users/tickets/${auth.loggedInInfo._id}`);
//   //       setTickets(res.data.Tickets);
//   //     } catch (error) {
//   //       dispatch(handleIsError(true))
//   //       dispatch(handleErrorMessage(error.message))
//   //     }
//   //     dispatch(handleIsLoading(false))
//   //   };
//   //   wishList();
//   // }, []);
//   return (
//     <>
//       <Box>
//         <Container>
//           {!common.isLoading ? (
//             <Grid container spacing={1} p={1}>
//               {Tickets.map((Ticket) => {
//                 return (
//                   <Grid key={Ticket._id} item xs={12}>
//                     <TicketCard Ticket={Ticket} />
//                   </Grid>
//                 );
//               })}
//               {Tickets.length <= 0 && (
//                 <Typography
//                 fontSize={{xs:15,sm:20,md:25,lg:30}}
//                 fontWeight={{xs:600,md:700}}
//                 textAlign="center"
//                 width="100%"
//                   sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%,-50%)",
//                   }}
//                 >
//                   Your Order is currently empty.
//                 </Typography>
//               )}
//             </Grid>
//           ) : (
//             <CircularProgress
//               sx={{
//                 color: "#0071eb",
//                 width: {
//                   xs: "100px !important",
//                   md: "150px !important",
//                 },
//                 height: {
//                   xs: "100px !important",
//                   md: "150px !important",
//                 },
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%,-50%) !important",
//               }}
//             />
//           )}
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default OrderPageContainer;