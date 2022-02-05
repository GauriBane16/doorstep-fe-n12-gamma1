import React, { useEffect, useState } from "react";
import Header from "./../library/components/Header";
import Categories from "../library/components/Categories";
import ImagesGrid from "../library/components/Grid";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../app/reducers/productReducer";
import config from "../config.json";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Theme from "../library/styleHelpers/customTheme";

const LandingPage = () => {
  let [paginationInfo, setPaginationInfo] = useState({
    skip: 0,
    limit: 6,
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const productList = data.productReducer.productList.result;
  const categoryList = data.categoryReducer.categoryList.result;
  const apiName = `user/productList?prefix=${config.result.prefix}&skip=${paginationInfo.skip}&limit=${paginationInfo.limit}`;
  useEffect(() => {
    dispatch(
      productActions.fetchProduct({
        apiName: apiName,
      })
    );
  }, []);
  const loadPreviousProductPage = () => {
    if (paginationInfo.skip === 0) return;
    const newSkip = paginationInfo.skip - paginationInfo.limit;
    setPaginationInfo({ skip: newSkip, limit: 6 });
    dispatch(
      productActions.fetchProduct({
        apiName: apiName,
      })
    );
  };

  const loadNextProductPage = () => {
    // if(paginationInfo[skip]==0)
    //  return;
    const newSkip = paginationInfo.skip + paginationInfo.limit;
    setPaginationInfo({ skip: newSkip, limit: 6 });
    dispatch(
      productActions.fetchProduct({
        apiName: apiName,
      })
    );
  };
  return (
    <Container maxWidth="false" justify="center">
      <Grid container rowSpacing={10}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Grid container columnSpacing={8}>
            <Grid item xs={2}>
              <Grid container rowSpacing={8}>
                <Grid item xs={12} fullwidth={1}>
                  <Categories values={categoryList} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={12}>
                  <ImagesGrid values={productList} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item sm={6} md={6} lg={6} xl={6}>
                      <IconButton onClick={loadPreviousProductPage}>
                        <Icon
                          sx={{
                            color: `${Theme.Colors.primary || "#2592AA"}`,
                            fontSize: 30,
                          }}
                        >
                          arrow_back_ios_new
                        </Icon>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <IconButton onClick={loadNextProductPage}>
                        <Icon
                          sx={{
                            color: `${Theme.Colors.primary || "#2592AA"}`,
                            fontSize: 30,
                          }}
                        >
                          arrow_forward_ios
                        </Icon>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
