import logging
import sys
from datetime import datetime
from pathlib import Path


class StructuredLogger:
    """Structured logging utility for the scraper."""
    
    def __init__(self, name="nexos_scraper", log_dir="logs"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)
        
        # Create logs directory
        Path(log_dir).mkdir(exist_ok=True)
        
        # File handler with detailed formatting
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        fh = logging.FileHandler(f"{log_dir}/scraper_{timestamp}.log")
        fh.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s'
        )
        fh.setFormatter(file_formatter)
        
        # Console handler with simpler formatting
        ch = logging.StreamHandler(sys.stdout)
        ch.setLevel(logging.INFO)
        console_formatter = logging.Formatter('%(levelname)s: %(message)s')
        ch.setFormatter(console_formatter)
        
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)
    
    def debug(self, msg, **kwargs):
        self._log(logging.DEBUG, msg, **kwargs)
    
    def info(self, msg, **kwargs):
        self._log(logging.INFO, msg, **kwargs)
    
    def warning(self, msg, **kwargs):
        self._log(logging.WARNING, msg, **kwargs)
    
    def error(self, msg, **kwargs):
        self._log(logging.ERROR, msg, **kwargs)
    
    def _log(self, level, msg, **kwargs):
        if kwargs:
            structured_msg = f"{msg} | " + " | ".join([f"{k}={v}" for k, v in kwargs.items()])
        else:
            structured_msg = msg
        self.logger.log(level, structured_msg)


# Global logger instance
logger = StructuredLogger()
