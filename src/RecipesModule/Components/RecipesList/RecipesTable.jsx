/** @format */

import { Visibility } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { OverlayTrigger, Popover } from "react-bootstrap";

import noData from "../../../assets/images/nodata.png";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
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

export default function RecipesTable(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Item Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Price&nbsp;(EGP)</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Tag</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.recipesList.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <div style={{ width: "8rem" }}>
                  <img
                    className="w-100"
                    src={
                      row?.imagePath ? props.baseImg + row?.imagePath : noData
                    }
                    alt="recipes image"
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{row?.price}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.description}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.tag?.id}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.category[0]?.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className="mx-2">
                  <List>
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
                                // onClick={() => props.showUpdateModal(row)}
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
                        <MoreHorizIcon fontSize="small" id={id} />
                      </OverlayTrigger>
                    </ListItem>
                  </List>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
