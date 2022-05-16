import { Component } from 'react';
import style from './SearchFrom.module.scss';
import IconButton from '../IconButton';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';

class SearchFrom extends Component {
    state = {
        value: '',
    }

    handleChange = (e) => {
        const {value} = e.currentTarget;
        
        this.setState({value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const stateValue = this.state.value;
        
        if(this.state.value.trim() === '') return;

        this.props.onSubmit(this.state.value);
        // this.setState({value: ''});
    }
    
    render () {
        const {value} = this.state;

        return (
            <div className={style.Searchbar}>
                <form>
                    <div className={style.SearchForm__wrap}>
                        <input
                            className={style.SearchForm__input}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            value={value}
                            onChange={this.handleChange}
                        />
                        <IconButton type="submit" className={style.SearchForm__button} onClick={this.handleSubmit} aria-label="submit button">
                            <SearchIcon width="15" height="15" />
                        </IconButton>
                        {/* <button type="submit"
                            onClick={this.handleSubmit}
                        >
                            search
                        </button> */}
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchFrom;