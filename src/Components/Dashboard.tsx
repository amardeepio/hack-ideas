import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { FieldSortOrder, SortOrder } from "../constant";
import { getData } from "../functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HackIdea } from "../interfaces/documentData";
import { FilterBar } from "./FilterBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ChallengeCards } from "./ChallengeCards";

export const Dashboard: React.FC = () => {
  const [user] = useLocalStorage("user", "");
  const history = useHistory();
  if (!user) {
    history.push("/login");
  }
  const [ideaList, setIdeaList] = useState<HackIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [field, setField] = useState("createdAt");
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState<FieldSortOrder>(SortOrder.DESC);
  const fetchData = async () => {
    let data = await getData(field, order);
    if (searchText)
      data = data.filter((val) =>
        (val as unknown as HackIdea).title
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    setLoading(false);
    setIdeaList(data as unknown as HackIdea[]);
  };
  useEffect(() => {
    fetchData();
  }, [field, order, searchText]);
  return (
    <>
      <Header />
      <main className="mt-3 dashboard-main">
        <Row>
          <Col md={12}>
            <Row>
              <Col>
                <FilterBar
                  order={order}
                  updateField={setField}
                  updateOrder={setOrder}
                  field={field}
                  searchText={searchText}
                  onChangeValue={setSearchText}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <ChallengeCards ideaList={ideaList} loading={loading} updateList={fetchData} />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  );
};
