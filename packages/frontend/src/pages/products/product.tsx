import {Card,CardBody,CardFooter,Image,Stack,Heading,Text,Divider,ButtonGroup,Button,Container,Box,Textarea,Select,Flex,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useParams } from "react-router-dom";
import {RootState,AppDispatch} from '../../redux/store/index'
import * as actions from "../../redux/actions/index";

export default function ProductPage(props: any) {

  const {productId}=useParams() ;
  
  const dispatch:AppDispatch= useDispatch();
  
  useEffect(()=>{
    if (productId) dispatch(actions.getProductDetail(productId));
  },[dispatch,productId]);
  
  const prod=useSelector((state:RootState)=>state.productDetail);

  const [text, setText] = useState("")
  const [num, setNum] = useState(0)
  const [review, setReview] = useState({coment:"",stars:-1})

  const  handleTextChange = (e: any) => {
    let inputValue = e.target.value
    setText(inputValue)
  };

  const handleNumChange = (e: any) => {
    let inputValue = e.target.value
    setNum(inputValue)
  };

  const onClickComent=()=>{
      let rev={coment:text,stars:num}
    setReview(rev)
  };

  const onClickCart=()=>{
    localStorage.setItem(prod.name,JSON.stringify(prod))
  }

  const reviews = [
    { coment: "feo el producto, no me ha servido para nada y no me convence, creo que fue una perdida de tiempo y  plata", stars: 5.0 },
    { coment: "¡muy buen producto!", stars: 5.5 },
    { coment: "buen producto", stars: 4.5 },
  ];

  const comentarios = reviews.map((element, i) => {
    return <Text key={i} color="white" bg={"gray"} m="2" p="2" borderRadius="10px" marginInlineStart="20px">{element.coment}</Text>;
  });

  const reviewCount = reviews.length;

  var votation = 0;

  for (var i = 0; i < reviews.length; i++) {
    votation += reviews[i].stars;
  }

  var rating = votation/reviewCount;

  interface RatingProps {
    ratinge: number;
    numReviews: number;
  }
  
  function Rating({ ratinge, numReviews }: RatingProps) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(ratinge*2)/2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'yellow' : 'gray.300'}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }}color='yellow' />
            }
            return <BsStar key={i} style={{ marginLeft: '1' }}color="gray" />;
          })}
      </Box>
    );
  }

  return (
    <Box boxSize="100%" padding="10%" bg="black">
      <Card marginBottom="20px">
        <CardBody>
          <Container boxSize="70%" centerContent>
            <Image
              src={prod.imageUrl}
              borderRadius="lg"
            />
          </Container>

          <Stack mt="6" spacing="3">
            <Heading size="md">{prod.name}</Heading>
            <Text>
              {prod.description}
            </Text>
            <Text>Stock: {prod.stock}</Text>
            <Text color="red" fontSize="2xl">
              ${prod.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="1">
            <Button variant="solid" colorScheme="red">
              Comprar
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={onClickCart}>
              Añadir al carrito
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Box display="flex" mt="2" alignItems="center">
      <Flex justifyContent="space-between" alignContent="center">
        <Rating ratinge={rating} numReviews={reviewCount} />
      </Flex>
        <Box as="span" ml="10%" color="white" fontSize="sm">
          <Text fontSize="15px">{reviewCount} reviews</Text>
        </Box>
      </Box>
        <Box >
          <Text color="white" mt="20px" mb="20px" fontStyle="bold">Comentarios:</Text>
          {comentarios}
        </Box>
        <Box mt="10">
          <Textarea  value={text} onChange={handleTextChange} color="white" placeholder="Escriba su reseña aquí." mb="2" />
          <Select placeholder='Seleccione Puntuacion' onChange={handleNumChange} variant="filled" color="black" bg="white" colorScheme="blackAlpha" borderColor="red" mb="2" >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>     
          </Select>
          <Button variant="solid" colorScheme="red" width="100%" onClick={onClickComent}>
            Comentar
          </Button>
      </Box>
    </Box>
  );
}
