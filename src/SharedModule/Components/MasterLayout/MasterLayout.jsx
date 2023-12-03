/** @format */

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import NavCompoenet from "../NavCompoenet/NavCompoenet";
import SideBar from "../SideBar/SideBar";

const MasterLayout = ({ adminData }) => {
  // const [currentUrl, setCurrentUrl] = useState("");
  // let location = useLocation();

  // console.log(currentUrl);
  // useEffect(() => setCurrentUrl(location.pathname), [currentUrl]);
  return (
    <div className="d-flex  px-0">
      <div
        style={{
          backgroundColor: "#1f263e",
          borderRadius: "0rem 2.625rem 0rem 0rem",
        }}
      >
        <SideBar />
      </div>
      <div className="w-100 my-3 mx-2">
        <div className="mx-3 ">
          <div className="my-3 nav-sec">
            <NavCompoenet adminData={adminData} />
          </div>
          <div className="header-sec">
            <Header
              title={"UpSkilling"}
              paragraph={
                " This is a welcoming screen for the entry of the application , you can    now see the options"
              }
            />
          </div>

          <div className="bg-light  my-3  rounded-3 ">
            {/* {location.pathname == "/dashboard" ? (
                <>
            <Container>
                  <Row className="align-items-center  justify-content-between">
                    <Col md={10}>
                      <h2>
                        Fill the <span className="text-success">Recipes !</span>{" "}
                      </h2>
                      <p>
                        you can now fill the meals easily using the table and
                        form , click here and sill it with the table !
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
                </>
              ) : (
                ""
              )} */}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
