import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../Grid/GridContainer/GridContainer";
import GridItem from "../Grid/GridItem/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";

import styles from "../../../assets/jss/sectionStyle";

const useStyles = makeStyles(styles);

export default function Section(props) {
  const classes = useStyles();
  const { plainTabs, children } = props;

  return (
    <div className={classes.container}>
      <div id="nav-tabs">
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card plain={plainTabs}>
              <CardHeader color="primary" plain={plainTabs}/>
              <CardBody>
                <p>
                  {children}
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
