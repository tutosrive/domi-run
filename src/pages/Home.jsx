import {
  Container,
  HomeSlider,
  PopularDishes,
  OurBurger,
  ChooseWhatYouWant,
  ClientRatings,
} from "../components";

function Home() {
  return (
    <>
      <HomeSlider />
      <Container>
        <div className="mt-[60px] flex flex-col gap-[60px]">
          <OurBurger />
          <PopularDishes />
          <ChooseWhatYouWant />
          <ClientRatings />
        </div>
      </Container>
    </>
  );
}

export default Home;
