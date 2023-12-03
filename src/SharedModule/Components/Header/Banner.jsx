/** @format */

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Banner = () => {
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location.search);

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
  }, [navigate, isLoading]);
  const handleClick = () => setLoading(true);
  return (
    <Container>
      <Row className="align-items-center  justify-content-between">
        <Col md={9}>
          <h2>
            Fill the <span className="text-success">Recipes !</span>{" "}
          </h2>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </Col>
        <Col className="" md={3}>
          <div>
            <Button
              type="submit "
              variant="success"
              size="lg"
              style={{ width: "15rem" }}
              disabled={isLoading}
              onClick={!isLoading ? handleClick : null}
            >
              {isLoading ? "Loading…" : `Fill Recipes`}

              <span>
                <ArrowForwardIcon fontSize="small" />
              </span>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
