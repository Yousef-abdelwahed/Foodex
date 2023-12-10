/** @format */

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import noData from "../../../assets/images/nodata.png";
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CategoryTable(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    console.log(event.currentTarget);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#e3e2e2", color: "white" }}>
              <TableCell>Item Name</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="text-center"></TableBody>
          {/* {props.categoriesList.length >= 0 ? ( */}
          <TableBody>
            {props.categoriesList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}{" "}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.modificationDate}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <div className="mx-2">
                    {/* <MoreHorizIcon
                        fontSize="small"
                        id={id}
                        onClick={handleClick}
                      /> */}
                    {/* <Popper
                        placement="left"
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        transition
                      > */}
                    {/* {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Box
                            sx={{
                              border: 1,
                              p: 0,
                              bgcolor: "background.paper",
                              borderRadius: "1rem",
                            }} */}
                    {/* > */}
                    <List>
                      {/* <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <Visibility className="text-success" />
                            </ListItemIcon>
                            <ListItemText primary="view" />
                          </ListItemButton>
                        </ListItem> */}
                      {/* Update list */}
                      <ListItem disablePadding>
                        <OverlayTrigger
                          trigger="click"
                          placement="left"
                          overlay={
                            <Popover id={`popover-positioned-left`}>
                              {/* <Popover.Header as="h3">{`Popover left`}</Popover.Header> */}
                              <Popover.Body>
                                <ListItem
                                  disablePadding
                                  onClick={() => props.showUpdateModal(row)}
                                >
                                  <strong>
                                    {" "}
                                    <i className="fa-regular fa-pen-to-square text-success"></i>
                                    <span className="text-success mx-3">
                                      Edit
                                    </span>{" "}
                                  </strong>
                                </ListItem>
                                <ListItem
                                  disablePadding
                                  className="my-2"
                                  onClick={() => props.showDeleteModal(row.id)}
                                >
                                  <strong>
                                    <DeleteOutlineIcon className="text-success" />
                                    <span className="text-success mx-2 ">
                                      Delete
                                    </span>
                                  </strong>
                                </ListItem>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <MoreHorizIcon
                            fontSize="small"
                            id={id}
                            // onClick={handleClick}
                          />
                          {/* <Button variant="secondary">Popover on left</Button> */}
                        </OverlayTrigger>
                      </ListItem>
                      {/* <ListItem
                          disablePadding
                          onClick={() => props.showDeleteModal(row.id)}
                        >
                          <ListItemButton>
                            <ListItemIcon>
                              <DeleteOutlineIcon className="text-success" />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                          </ListItemButton>
                        </ListItem> */}
                    </List>
                    {/* </Box>
                        </Fade>
                      )} */}
                    {/* </Popper> */}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          {/* // ) : (
          //   <div className="text-center">
          //     <img src={noData} />
          //   </div>
          // )} */}
        </Table>
      </TableContainer>
      <div></div>
    </>
  );
}
