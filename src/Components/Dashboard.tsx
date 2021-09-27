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
import { IdeaCards } from "./IdeaCards";

export const Dashboard: React.FC = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const history = useHistory();
  if (!user) {
    history.push("/login");
  }
  const [ideaList, setIdeaList] = useState<HackIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [field, setField] = useState("createdAt");
  const [order, setOrder] = useState<FieldSortOrder>(SortOrder.DESC);
  const fetchData = async () => {
    const data = await getData(field, order);
    setLoading(false);
    setIdeaList(data as unknown as HackIdea[]);
  };
  useEffect(() => {
    fetchData();
  }, [field, order]);
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
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <IdeaCards ideaList={ideaList} loading={loading} />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  );
};
