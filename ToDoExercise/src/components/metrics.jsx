import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//mui
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Button, Card, Container } from "@mui/material";

export function Metrics() {
  //filter tasks
  const finishedTasks = useSelector((state) =>
    state.tasks.storedTasks.filter((t) => t.finished === true)
  );

  const openTasks = useSelector((state) =>
    state.tasks.storedTasks.filter((t) => t.finished === false)
  );

  //calc avg duration
  let totalTime = 0;
  finishedTasks.forEach((t) => {
    totalTime += t.elapsedTime;
  });
  const averageDuration = totalTime / finishedTasks.length;

  return (
    <>
      <Container
        sx={{
          width: "1000px !important",
        }}
      >
        <div className="metrics">
          <h1>Metrics</h1>
          <div className="row">
            <div className="col-9">
              <Link to="/tasks">
                <Button
                  sx={{
                    width: "195px",
                    backgroundColor: "#a881af !important",
                    fontWeight: "bold",
                    float: "left",
                  }}
                >
                  <ListAltIcon></ListAltIcon>
                  Tasks
                </Button>
              </Link>
            </div>
          </div>
          <Container
            sx={{
              backgroundColor: "white !important",
              paddingTop: "25px",
              paddingBottom: "25px",
              borderRadius: "5px",
            }}
          >
            <div className="row">
              <div className="col-4">
                <div className="finished">
                  <Card
                    sx={{
                      minWidth: 275,
                      backgroundColor: "#33b249",
                      padding: "7px",
                    }}
                  >
                    <h3>Finished</h3>
                    <br></br>
                    <h1>{finishedTasks.length}</h1>
                  </Card>
                </div>
              </div>
              <div className="col-4">
                <div className="open">
                  <Card
                    sx={{
                      minWidth: 275,
                      backgroundColor: "#dd7973",
                      padding: "7px",
                    }}
                  >
                    <h3>Open</h3>
                    <br></br>
                    <h1>{openTasks.length}</h1>
                  </Card>
                </div>
              </div>
              <div className="col-4">
                <div className="duration">
                  <Card
                    sx={{
                      minWidth: 275,
                      backgroundColor: "#4681f4",
                      padding: "7px",
                    }}
                  >
                    <h3>Avg Duration</h3>
                    <br></br>
                    <h1>
                      {new Date(averageDuration * 1000)
                        .toISOString()
                        .substring(11, 19)}
                    </h1>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
}
