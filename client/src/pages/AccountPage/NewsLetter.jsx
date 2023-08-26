import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import "./account.scss";

function NewsLetter() {
  return (
    <div>
      <div className="card main-card">
        <p className="card-header header">Newsletter Preferences</p>
        <div className="container">
          <div className="row py-2">
            <div className="col-md-6">
              <div className="card h-100">
                <p className="card-header">SUBSCRIBE TO</p>
                <div className="card-body">
                  <div>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value=" Receive daily newsletters "
                          control={<Radio />}
                          label="Receive daily newsletters"
                        />
                        <FormControlLabel
                          value="I don't want to receive daily newsletters"
                          control={<Radio />}
                          label="I don't want to receive daily newsletters"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 pt-2">
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  fontSize: "1.1em",
                  backgroundColor: "skyblue",
                  "&:hover": {
                    backgroundColor: "#4a90e2",
                  },
                }}
              >
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
