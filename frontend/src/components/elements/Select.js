import { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";

export default function Select(props) {

  const { options, optionsUrl, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [fetchedOptions, setFetchedOptions] = useState([]);

  const getOptions = async() => {
    setLoading(true);
    const resp = await apiClient.post(optionsUrl);
    handleResp(resp, data => {
      setFetchedOptions(data.options);
      setLoading(false);
    });
  }

  useEffect(() => {
    if(optionsUrl) getOptions();
  }, [optionsUrl]);

  return(
    <ReactSelect className="react-select" isDisabled={loading} options={options ?? fetchedOptions} {...rest}/>
  );
}
