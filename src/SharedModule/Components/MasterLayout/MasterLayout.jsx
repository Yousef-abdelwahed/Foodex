/** @format */

import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import NavCompoenet from "../NavCompoenet/NavCompoenet";
import Header from "../Header/Header";
import { Row, Col, Button, Container } from "react-bootstrap";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MasterLayout = ({ adminData }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
        navigate("/dashboard/recipes");
      });
    }
  }, [isLoading]);
  const handleClick = () => setLoading(true);

  return (
    <div className="d-flex  px-0">
      <div>
        <div>
          <SideBar />
        </div>
      </div>
      <div className="w-100 my-3 mx-2">
        <div className="mx-3 ">
          <div className="my-3">
            <NavCompoenet adminData={adminData} />
          </div>
          <div>
            <Header />
          </div>

          <div className="bg-light  my-3 p-3 rounded-3 ">
            <Container>
              <Row className="align-items-center  justify-content-between">
                <Col md={10}>
                  <h2>
                    Fill the <span className="text-success">Recipes !</span>{" "}
                  </h2>
                  <p>
                    you can now fill the meals easily using the table and form ,
                    click here and sill it with the table !
                  </p>
                </Col>
                <Col className="" md={2}>
                  <div>
                    <Button
                      type="submit "
                      variant="success"
                      size="lg"
                      disabled={isLoading}
                      onClick={!isLoading ? handleClick : null}
                    >
                      {isLoading ? "Loading…" : `Fill Recipes`}

                      <span>
                        <ArrowForwardIcon fontSize="small" />{" "}
                      </span>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
