/** @format */

import { Visibility } from "@mui/icons-material";
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

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { OverlayTrigger, Popover } from "react-bootstrap";

import noData from "../../../assets/images/nodata.png";

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
  console.log();
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
          {props.recipesList?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <div style={{ width: "7rem" }}>
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
                        onClick={handleClick}
                        anchorEl={anchorEl}
                        overlay={
                          <Popover id={`popover-positioned-left`}>
                            {/* <Popover.Header as="h3">{`Popover left`}</Popover.Header> */}
                            <Popover.Body>
                              <ListItem
                                disablePadding
                                onClick={() => props.showViewModal(row)}
                              >
                                <strong>
                                  <Visibility className="text-success" />
                                  <span className="text-success mx-3">
                                    View
                                  </span>
                                </strong>
                              </ListItem>
                              {props.adminData?.userGroup !== "SuperAdmin" ? (
                                <ListItem
                                  disablePadding
                                  className="my-2"
                                  onClick={() => props.addToFavorite(row.id)}
                                >
                                  <strong>
                                    <i className="fa-solid fa-heart text-bold fs-6 ms-1 text-success"></i>
                                    <span className="text-success mx-4  ">
                                      Favorite
                                    </span>
                                  </strong>
                                </ListItem>
                              ) : (
                                ""
                              )}
                              {props.adminData?.userGroup === "SuperAdmin" ? (
                                <>
                                  <ListItem
                                    disablePadding
                                    className="my-2"
                                    onClick={() => props.showUpdateModal(row)}
                                  >
                                    <strong>
                                      <i className="fa-regular fa-pen-to-square text-success text-bold fs-6 ms-1"></i>
                                      <span className="text-success mx-4  ">
                                        Edit
                                      </span>
                                    </strong>
                                  </ListItem>
                                  <ListItem
                                    disablePadding
                                    className="my-2"
                                    onClick={() =>
                                      props.showDeleteModal(row.id)
                                    }
                                  >
                                    <strong>
                                      <DeleteOutlineIcon className="text-success" />
                                      <span className="text-success mx-3  ">
                                        Delete
                                      </span>
                                    </strong>
                                  </ListItem>
                                </>
                              ) : (
                                ""
                              )}
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
