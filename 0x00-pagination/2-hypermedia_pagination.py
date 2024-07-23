#!/usr/bin/env python3
""" Simple pagination function """
import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Returns a  particular page using start and end"""
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        rows = []
        with open("Popular_Baby_Names.csv", 'r') as csv_file:
            (start, end) = index_range(page, page_size)
            fp = csv.reader(csv_file)
            next(fp, None)
            for row in fp:
                rows.append(row)
        return rows[start: end]

    def get_hyper(self, page: int = 1, page_size: int = 10):
        """ Returns a dictinary containing the ff:
            page_size: the length of the returned dataset page
            page: the current page number
            data: the dataset page 
            next_page: number of the next page, None if no next page
            prev_page: number of the previous page, None if no previous page
            total_pages: the total number of pages in the dataset as an integer
        """
        hyper_dict = {}
        data = self.get_page(page, page_size)
        hyper_dict["page_size"] = len(data)
        hyper_dict["page"] = page
        hyper_dict["data"] = data
        if hyper_dict["page_size"] == 0:
            hyper_dict["next_page"] = None
        else:
            hyper_dict["next_page"] = page + 1
        if page == 1:
            hyper_dict["prev_page"] = None
        else:
            hyper_dict["prev_page"] = page - 1
        total_items = len(self.dataset())
        hyper_dict["total_pages"] = math.ceil(total_items / page_size)

        return hyper_dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ containing a start index and an end index corresponding to the
         range of indexes to return in a list for
        those particular pagination parameters """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
