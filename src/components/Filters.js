import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'


const Filters = () => {
  const { filters: { text, company, category, color, min_price, max_price, price, shipping }, updateFilters, clearFilters, all_products, } = useFilterContext()

  const categories = getUniqueValues(all_products, "category") //вызываем функцию с двумя параметрами
  const companies = getUniqueValues(all_products, "company")
  const colors = getUniqueValues(all_products, "colors")
  //console.log("Filters__categories", categories)          className={`${category === category.toUpperCase() ? 'active' : ''}`}  state.filters?.category

  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}  >
        <input type="text" name="text"
          placeholder="поиск" className="search-input" value={text} onChange={updateFilters} />
        {/* тут name в инпуте должно совпадать с именем свойства в ФильтрКонтекст filters или нужно будет хардкодить  */}
        <div className="form-control">
          <h5>категории:</h5>
          <div>
            {categories.map((catGory, index) => {
              return < button key={index} onClick={updateFilters} name="category" type="button" className={`${catGory.toLowerCase() === category ? 'active' : ''}`}   >
                {/* {`${category.slice(0, 1).toLocaleUpperCase()}${category.slice(1, category.length).toLowerCase()}`} */}
                {catGory}
              </button>
            })}
          </div>
        </div>
        <div className="form-control">
          <h5> Фирма </h5>
          <select name="company" value={company} onChange={updateFilters} className="company"    >
            {/* тут name из селекта и value из optiona динамически передаем в контекст, который диспатчит эти данные в редьюсер и подставляет их в стейт */}
            {companies.map((catGory, index) => {
              return < option key={catGory} value={catGory} > {catGory} </option>
            })}
          </select>
        </div>

        <div className="form-control">
          <h5> цвета </h5>
          <div className="colors">
            {colors.map((clr, index) => {
              if (clr === "all") {
                return <button key={index} name="color" onClick={updateFilters} data-color='all' className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`} > all </button>
              }
              return < button key={index}
                onClick={updateFilters}
                name="color" type="button"
                style={{ background: clr }}
                className={`${clr === color ? "color-btn active" : "color-btn"}`}
                data-color={clr}
              >
                {color === clr ? <FaCheck /> : null}
              </button>
            })}
          </div>
        </div>

        <div className="form-control">
          <h5>price</h5>
          <div className="price">{formatPrice(price)}  </div>
          <input type="range" name="price" min={min_price} max={max_price} onChange={updateFilters} value={price} />
        </div>

        <div className='form-control shipping'>
          <label htmlFor='shipping'> free shipping</label>
          <input
            type='checkbox'
            name='shipping'
            id='shipping'
            onChange={updateFilters}
            checked={shipping}
          />
        </div>
      </form>
      <button type="button" className="clear-btn" onClick={clearFilters}>   Очистить фильтр    </button>
    </div>
  </Wrapper>


}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-bottom: 1px solid transparent;
    // border-top: 1px solid transparent;
    border-color: var(--clr-grey-5);
    background: linear-gradient(white,  var(--clr-grey-10) 60%);
  //  background: var(--clr-grey-10);
    
  }            
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
