
/**
 * ? Pagination
 * @params 
 * 
 * @returns lista de _contenetItems. 
 * ? Puede devolver solo 1 pagina, con los contentItems limitados o Todas las paginas pero contentItems limitados por pagina.
 * 
 */


const page: number = 10; 
const limit: number = 20; 
const startIndex: number = (page - 1) * limit
const endIndex:number = page * limit


function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
















// export const Coins: React.FC = () => {
//   const [coinsData, setCoinsData] = useState<Coin[]>([])
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(10);


//   const handlePrevPage = (prevPage: number) => {
//     setPage((prevPage) => prevPage - 1);
//   };

//   const handleNextPage = (nextPage: number) => {
//     setPage((nextPage) => nextPage + 1);
//   };