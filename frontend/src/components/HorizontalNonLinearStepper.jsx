import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import * as React from "react";
import "./HorizontalNonLinearStepper.css";

const steps = [
  "Select Database Service type",
  "Configure Database Service",
  // "Database connection details",
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [databaseType, setDatabaseType] = React.useState("mysql");

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((h4, index) => (
          <Step key={h4} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {h4}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {(() => {
                switch (activeStep) {
                  case 0:
                    return (
                      <div>
                        <h2>Step 1: Select Database Service type</h2>
                        {/* Dropdown for Database Service types */}
                        <div>
                          <select
                            className="form-select"
                            value={databaseType}
                            onChange={(e) => setDatabaseType(e.target.value)}
                          >
                            <option value="mysql">MySQL</option>
                            <option value="mariadb">MariaDB</option>
                            <option value="postgresql">PostgreSQL</option>
                            <option value="mongodb">MongoDB</option>
                            <option value="redis">Redis</option>
                            <option value="memcached">Memcached</option>
                            <option value="elasticsearch">Elasticsearch</option>
                            <option value="cassandra">Cassandra</option>
                            <option value="neo4j">Neo4j</option>
                            <option value="couchbase">Couchbase</option>
                            <option value="couchdb">CouchDB</option>
                            <option value="dynamodb">DynamoDB</option>
                          </select>
                        </div>
                      </div>
                    );
                  case 1:
                    return (
                      <div>
                        <div>Step 2: Configure Database Service</div>
                        {/* Form for Database Service configuration */}
                        <div class="container">
                          <h2>Database Service Configuration</h2>
                          {(() => {
                            switch (databaseType) {
                              case "mysql":
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <h4
                                      className="form-label-header"
                                      for="host"
                                    >
                                      Mysqk Connection
                                    </h4>
                                    <p className="form-label-description">
                                      MySQL Database Connection Configuration
                                    </p>

                                    <h4 className="form-label-header">
                                      Connection Scheme
                                    </h4>
                                    <p className="form-label-description">
                                      SQLAlchemy driver scheme options
                                    </p>
                                    <select className="form-select">
                                      <option value="mysql">mysql</option>
                                      <option value="mysql+pymysql">
                                        mysql+pymysql
                                      </option>
                                      <option value="mysql+mysqldb">
                                        mysql+mysqldb
                                      </option>
                                      <option value="mysql+oursql">
                                        mysql+oursql
                                      </option>
                                    </select>

                                    <h4
                                      className="form-label-header"
                                      for="username"
                                    >
                                      Username
                                    </h4>
                                    <p className="form-label-description">
                                      Username to connect to MySQL. This user
                                      should have the privileges to read all the
                                      metadata in MySQL
                                    </p>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="username"
                                      name="username"
                                      placeholder="Username"
                                    />
                                    <h4
                                      className="form-label-header"
                                      for="password"
                                    >
                                      Password
                                    </h4>
                                    <p className="form-label-description">
                                      Password to connect to MySQL
                                    </p>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="password"
                                      name="password"
                                      placeholder="Password"
                                    />

                                    <h4
                                      className="form-label-header"
                                      for="host-and-port"
                                    >
                                      Host and Port
                                    </h4>
                                    <p className="form-label-description">
                                      Host and port to connect to MySQL
                                    </p>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="host-and-port"
                                      name="host-and-port"
                                      placeholder="Host and Port"
                                    />

                                    <h4
                                      className="form-label-header"
                                      for="database-name"
                                    >
                                      Database Schema
                                    </h4>
                                    <p className="form-label-description">
                                      Database schema of the data source. This
                                      is an optional parameter, if you would
                                      like to restrict the metadata reading to a
                                      single databaseSchema. When left blank,
                                      OpenMetadata attempts to scan all the
                                      databaseSchema.
                                    </p>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="database-name"
                                      name="database-name"
                                      placeholder="Database Schema"
                                    />

                                    <h4
                                      className="form-label-header"
                                      for="database-name"
                                    >
                                      Connection Options
                                    </h4>
                                    <p className="form-label-description">
                                      Additional connection options to build the
                                      URL that can be sent to service during the
                                      connection
                                    </p>

                                    {/* Test Connection */}
                                    <div className="test-button-container">
                                      <div>
                                        Test your connections before creating
                                        the service
                                      </div>
                                      <div>
                                        <button
                                          className="test-button"
                                          type="button"
                                        >
                                          Test Connection
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );

                              case "postgresql":
                                return (
                                  <div>
                                    <h4
                                      className="form-label-header"
                                      for="host"
                                    >
                                      Host
                                    </h4>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="host"
                                      name="host"
                                      placeholder="Host"
                                    />
                                    <h4
                                      className="form-label-header"
                                      for="port"
                                    >
                                      Port
                                    </h4>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="port"
                                      name="port"
                                      placeholder="Port"
                                    />
                                    <h4
                                      className="form-label-header"
                                      for="username"
                                    >
                                      Username
                                    </h4>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="username"
                                      name="username"
                                      placeholder="Username"
                                    />
                                    <h4
                                      className="form-label-header"
                                      for="password"
                                    >
                                      Password
                                    </h4>
                                    <input
                                      className="text-input"
                                      type="text"
                                      id="password"
                                      name="password"
                                      placeholder="Password"
                                    />
                                  </div>
                                );
                              default:
                                return <div>Not implemented yet</div>;
                            }
                          })()}
                        </div>
                      </div>
                    );

                  default:
                    return "Unknown step";
                }
              })()}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
